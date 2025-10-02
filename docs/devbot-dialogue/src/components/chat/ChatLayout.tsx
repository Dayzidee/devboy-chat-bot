import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SidebarProvider } from '@/components/ui/sidebar';
import ChatSidebar from './ChatSidebar';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { useChatStore } from '@/stores/chatStore';
import { useChat } from '@/hooks/useChat';

const ChatLayout = () => {
  const { currentChat, selectedMode, selectedAI } = useChatStore();
  const { sendMessage, loadChats, loadMessages } = useChat();

  useEffect(() => {
    // Load chats on mount
    loadChats();
  }, [loadChats]);

  useEffect(() => {
    // Load messages when chat changes
    if (currentChat) {
      loadMessages(currentChat.id);
    }
  }, [currentChat, loadMessages]);

  const handleSendMessage = async (content: string) => {
    await sendMessage(content, selectedMode, selectedAI);
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <SidebarProvider defaultOpen>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="flex h-screen w-full bg-background"
      >
        <ChatSidebar />
        
        <div className="flex flex-col flex-1 min-w-0">
          <ChatHeader />
          
          <div className="flex flex-col flex-1 min-h-0">
            <MessageList />
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </motion.div>
    </SidebarProvider>
  );
};

export default ChatLayout;