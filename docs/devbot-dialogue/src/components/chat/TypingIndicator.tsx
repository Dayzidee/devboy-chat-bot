import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export const TypingIndicator = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: [-8, 0, -8] },
  };

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  return (
    <div className="flex gap-3 justify-start">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>

      <div className="max-w-[80%] mr-12">
        <div className="bg-muted text-foreground rounded-2xl rounded-bl-md border border-border px-4 py-3 min-w-[60px]">
          <motion.div
            className="flex gap-1 items-center"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-primary rounded-full"
                variants={dotVariants}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            ))}
          </motion.div>
        </div>
        
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          <span>DevBot is thinking...</span>
        </div>
      </div>
    </div>
  );
};