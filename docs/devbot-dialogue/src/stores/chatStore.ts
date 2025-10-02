import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Chat, Message, AIModel, DevMode, Profile } from '@/types/chat';

interface ChatState {
  // Auth state
  user: Profile | null;
  isAuthenticated: boolean;
  
  // Chat state
  currentChat: Chat | null;
  chats: Chat[];
  messages: Message[];
  
  // UI state
  selectedMode: DevMode;
  selectedAI: AIModel;
  isTyping: boolean;
  sidebarOpen: boolean;
  isDarkMode: boolean;
  
  // Loading states
  isLoadingChats: boolean;
  isLoadingMessages: boolean;
  isSendingMessage: boolean;
  
  // Actions
  setUser: (user: Profile | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setCurrentChat: (chat: Chat | null) => void;
  setChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;
  updateChat: (chatId: string, updates: Partial<Chat>) => void;
  deleteChat: (chatId: string) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (messageId: string, content: string) => void;
  setSelectedMode: (mode: DevMode) => void;
  setSelectedAI: (model: AIModel) => void;
  setTyping: (isTyping: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setDarkMode: (isDark: boolean) => void;
  setLoadingChats: (loading: boolean) => void;
  setLoadingMessages: (loading: boolean) => void;
  setSendingMessage: (sending: boolean) => void;
  reset: () => void;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  currentChat: null,
  chats: [],
  messages: [],
  selectedMode: 'basic' as DevMode,
  selectedAI: 'openai' as AIModel,
  isTyping: false,
  sidebarOpen: true,
  isDarkMode: false,
  isLoadingChats: false,
  isLoadingMessages: false,
  isSendingMessage: false,
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setUser: (user) => set({ user }),
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      
      setCurrentChat: (chat) => set({ currentChat: chat }),
      setChats: (chats) => set({ chats }),
      addChat: (chat) => set((state) => ({ chats: [chat, ...state.chats] })),
      updateChat: (chatId, updates) => set((state) => ({
        chats: state.chats.map(chat => 
          chat.id === chatId ? { ...chat, ...updates } : chat
        ),
        currentChat: state.currentChat?.id === chatId 
          ? { ...state.currentChat, ...updates } 
          : state.currentChat
      })),
      deleteChat: (chatId) => set((state) => ({
        chats: state.chats.filter(chat => chat.id !== chatId),
        currentChat: state.currentChat?.id === chatId ? null : state.currentChat
      })),
      
      setMessages: (messages) => set({ messages }),
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      updateMessage: (messageId, content) => set((state) => ({
        messages: state.messages.map(msg => 
          msg.id === messageId ? { ...msg, content } : msg
        )
      })),
      
      setSelectedMode: (mode) => set({ selectedMode: mode }),
      setSelectedAI: (model) => set({ selectedAI: model }),
      setTyping: (isTyping) => set({ isTyping }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setDarkMode: (isDark) => set({ isDarkMode: isDark }),
      
      setLoadingChats: (loading) => set({ isLoadingChats: loading }),
      setLoadingMessages: (loading) => set({ isLoadingMessages: loading }),
      setSendingMessage: (sending) => set({ isSendingMessage: sending }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'devbot-chat-store',
      partialize: (state) => ({
        selectedMode: state.selectedMode,
        selectedAI: state.selectedAI,
        sidebarOpen: state.sidebarOpen,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);