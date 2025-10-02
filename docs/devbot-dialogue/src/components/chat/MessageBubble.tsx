import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CodeBlock } from './CodeBlock';
import type { Message } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Message copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy message to clipboard",
        variant: "destructive",
      });
    }
  };

  const renderContent = (content: string) => {
    // Check if content contains code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const textBefore = content.slice(lastIndex, match.index);
        if (textBefore.trim()) {
          parts.push(
            <div key={`text-${lastIndex}`} className="whitespace-pre-wrap">
              {textBefore}
            </div>
          );
        }
      }

      // Add code block
      const language = match[1] || 'text';
      const code = match[2];
      parts.push(
        <CodeBlock
          key={`code-${match.index}`}
          language={language}
          code={code}
        />
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      const remainingText = content.slice(lastIndex);
      if (remainingText.trim()) {
        parts.push(
          <div key={`text-${lastIndex}`} className="whitespace-pre-wrap">
            {remainingText}
          </div>
        );
      }
    }

    return parts.length > 0 ? parts : <div className="whitespace-pre-wrap">{content}</div>;
  };

  if (isSystem) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center my-4"
      >
        <Badge variant="secondary" className="px-3 py-1">
          {message.content}
        </Badge>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}

      <div className={`max-w-[80%] group ${isUser ? 'ml-12' : 'mr-12'}`}>
        <div
          className={`relative rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-br-md'
              : 'bg-muted text-foreground rounded-bl-md border border-border'
          }`}
        >
          {renderContent(message.content)}

          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity ${
              isUser ? 'text-primary-foreground/70 hover:text-primary-foreground' : ''
            }`}
            onClick={() => copyToClipboard(message.content)}
          >
            {copied ? (
              <Check className="w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
        </div>

        <div className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${
          isUser ? 'justify-end' : 'justify-start'
        }`}>
          {isUser && <User className="w-3 h-3" />}
          <span>
            {new Date(message.created_at).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary/60 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </motion.div>
  );
};