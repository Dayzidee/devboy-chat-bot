import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { useChatStore } from '@/stores/chatStore';
import type { Message } from '@/types/chat';

const MessageList = () => {
  const { messages, isTyping } = useChatStore();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const messageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 }
  };

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <ScrollArea ref={scrollAreaRef} className="flex-1 h-full">
      <motion.div 
        className="p-4 space-y-4"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ 
                duration: 0.3, 
                ease: "easeOut",
                delay: index * 0.05 
              }}
              layout
            >
              <MessageBubble message={message} />
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              layout
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>

        {messages.length === 0 && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center h-96 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Start a new conversation</h3>
            <p className="text-muted-foreground max-w-md">
              Ask me anything about coding, get help with debugging, or explore new technologies. 
              I'm here to help with your development journey!
            </p>
          </motion.div>
        )}
      </motion.div>
    </ScrollArea>
  );
};

export default MessageList;