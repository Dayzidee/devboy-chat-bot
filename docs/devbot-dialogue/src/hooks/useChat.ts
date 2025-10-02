import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useChatStore } from '@/stores/chatStore';
import { useToast } from '@/hooks/use-toast';
import type { Chat, Message, AIModel, DevMode, MessageRole } from '@/types/chat';
import { DEVELOPER_MODES } from '@/types/chat';

export const useChat = () => {
  const { toast } = useToast();
  const {
    user,
    currentChat,
    messages: storeMessages,
    setCurrentChat,
    setChats,
    setMessages,
    addMessage,
    updateMessage,
    addChat,
    updateChat,
    setTyping,
    setSendingMessage,
    setLoadingChats,
    setLoadingMessages,
  } = useChatStore();

  const loadChats = useCallback(async () => {
    if (!user) return;

    setLoadingChats(true);
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setChats(data || []);
    } catch (error: any) {
      console.error('Error loading chats:', error);
      toast({
        title: "Error",
        description: "Failed to load chats",
        variant: "destructive",
      });
    } finally {
      setLoadingChats(false);
    }
  }, [user, setChats, setLoadingChats, toast]);

  const loadMessages = useCallback(async (chatId: string) => {
    setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data || []).map(msg => ({
        ...msg,
        role: msg.role as MessageRole,
        metadata: msg.metadata as Record<string, any> || {}
      })));
    } catch (error: any) {
      console.error('Error loading messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    } finally {
      setLoadingMessages(false);
    }
  }, [setMessages, setLoadingMessages, toast]);

  const createChat = useCallback(async (title: string, mode: DevMode, aiModel: AIModel): Promise<Chat | null> => {
    if (!user) return null;

    try {
      const newChat = {
        user_id: user.id,
        title,
        mode,
        ai_model: aiModel,
        archived: false,
        tags: [],
      };

      const { data, error } = await supabase
        .from('chats')
        .insert(newChat)
        .select()
        .single();

      if (error) throw error;
      
      addChat(data);
      return data;
    } catch (error: any) {
      console.error('Error creating chat:', error);
      toast({
        title: "Error",
        description: "Failed to create chat",
        variant: "destructive",
      });
      return null;
    }
  }, [user, addChat, toast]);

  const sendMessage = useCallback(async (content: string, mode: DevMode, aiModel: AIModel) => {
    if (!user || !content.trim()) return;

    setSendingMessage(true);
    
    try {
      let chat = currentChat;
      
      // Create new chat if none exists
      if (!chat) {
        const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        chat = await createChat(title, mode, aiModel);
        if (!chat) return;
        setCurrentChat(chat);
      }

      // Create user message
      const userMessage = {
        chat_id: chat.id,
        role: 'user' as const,
        content,
        metadata: {},
      };

      const { data: userMessageData, error: userMessageError } = await supabase
        .from('messages')
        .insert(userMessage)
        .select()
        .single();

      if (userMessageError) throw userMessageError;
      addMessage({
        ...userMessageData,
        role: userMessageData.role as MessageRole,
        metadata: userMessageData.metadata as Record<string, any> || {}
      });

      // Set typing indicator
      setTyping(true);

      // Get messages for context
      const { data: messageHistory } = await supabase
        .from('messages')
        .select('role, content')
        .eq('chat_id', chat.id)
        .order('created_at', { ascending: true })
        .limit(10);

      const messages = (messageHistory || []).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Stream response from AI
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages, mode, model: aiModel }),
        });

        if (!response.ok || !response.body) {
          throw new Error("Failed to get AI response");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";
        let assistantMessageId = crypto.randomUUID();
        let textBuffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          textBuffer += decoder.decode(value, { stream: true });
          let newlineIndex: number;

          while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(jsonStr);
              const delta = parsed.choices?.[0]?.delta?.content;
              
              if (delta) {
                assistantContent += delta;
                
                // Check if message exists in store
                const messageExists = storeMessages.some(m => m.id === assistantMessageId);
                
                if (messageExists) {
                  // Update existing message
                  updateMessage(assistantMessageId, assistantContent);
                } else {
                  // Add new message
                  addMessage({
                    id: assistantMessageId,
                    chat_id: chat.id,
                    role: 'assistant',
                    content: assistantContent,
                    created_at: new Date().toISOString(),
                    metadata: { model: aiModel, mode },
                  });
                }
              }
            } catch (e) {
              // Partial JSON, continue
            }
          }
        }

        setTyping(false);

        // Save complete AI message to database
        if (assistantContent) {
          await supabase.from('messages').insert({
            chat_id: chat.id,
            role: 'assistant',
            content: assistantContent,
            metadata: { model: aiModel, mode },
          });

          // Update chat timestamp
          await supabase
            .from('chats')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', chat.id);
        }

      } catch (aiError: any) {
        console.error('AI service error:', aiError);
        setTyping(false);
        
        // Add error message
        const errorMessage = {
          chat_id: chat.id,
          role: 'assistant' as const,
          content: 'I\'m experiencing technical difficulties. Please try again in a moment.',
          metadata: {
            error: true,
            model: aiModel,
            mode,
          },
        };

        const { data: errorMessageData } = await supabase
          .from('messages')
          .insert(errorMessage)
          .select()
          .single();

        if (errorMessageData) {
          addMessage({
            ...errorMessageData,
            role: errorMessageData.role as MessageRole,
            metadata: errorMessageData.metadata as Record<string, any> || {}
          });
        }

        toast({
          title: "AI Service Error",
          description: "Failed to get response from AI. Please try again.",
          variant: "destructive",
        });
      }

    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setTyping(false);
      setSendingMessage(false);
    }
  }, [user, currentChat, storeMessages, createChat, setCurrentChat, addMessage, updateMessage, setTyping, setSendingMessage, toast]);

  const deleteChat = useCallback(async (chatId: string) => {
    try {
      const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId);

      if (error) throw error;

      // Remove from store handled by RLS policies and realtime
      toast({
        title: "Chat deleted",
        description: "Chat has been successfully deleted",
      });
    } catch (error: any) {
      console.error('Error deleting chat:', error);
      toast({
        title: "Error",
        description: "Failed to delete chat",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Set up real-time subscriptions
  const setupRealtimeSubscriptions = useCallback(() => {
    if (!user) return;

    // Subscribe to chat changes
    const chatSubscription = supabase
      .channel('chat-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chats',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Chat change:', payload);
          loadChats(); // Reload chats when changes occur
        }
      )
      .subscribe();

    // Subscribe to message changes for current chat
    let messageSubscription: any = null;
    if (currentChat) {
      messageSubscription = supabase
        .channel('message-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `chat_id=eq.${currentChat.id}`,
          },
          (payload) => {
            console.log('New message:', payload);
            if (payload.new) {
              addMessage(payload.new as Message);
            }
          }
        )
        .subscribe();
    }

    return () => {
      supabase.removeChannel(chatSubscription);
      if (messageSubscription) {
        supabase.removeChannel(messageSubscription);
      }
    };
  }, [user, currentChat, loadChats, addMessage]);

  return {
    loadChats,
    loadMessages,
    createChat,
    sendMessage,
    deleteChat,
    setupRealtimeSubscriptions,
  };
};