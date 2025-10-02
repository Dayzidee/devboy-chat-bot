import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Mic, MicOff, Image, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useChatStore } from '@/stores/chatStore';
import { DEVELOPER_MODES } from '@/types/chat';
import type { DevMode } from '@/types/chat';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSendMessage, isLoading = false }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { selectedMode, isSendingMessage } = useChatStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isSendingMessage) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handlePreBuiltPrompt = (prompt: string) => {
    setInput(prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const currentMode = DEVELOPER_MODES[selectedMode];

  return (
    <div className="border-t border-border bg-background p-4 space-y-4">
      {/* Pre-built Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-2"
      >
        {currentMode.preBuilt.slice(0, 3).map((prompt, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-accent transition-colors px-3 py-1"
              onClick={() => handlePreBuiltPrompt(prompt)}
            >
              {prompt}
            </Badge>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Input Area */}
      <Card className="border border-border/50 shadow-sm">
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={`Ask DevBot about ${selectedMode} development...`}
                className="min-h-[40px] max-h-[120px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12"
                disabled={isSendingMessage}
              />
              
              {/* File Upload Button */}
              <div className="absolute right-2 bottom-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={handleFileUpload}
                  disabled={isSendingMessage}
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*,.txt,.js,.ts,.py,.html,.css,.json,.md"
                  onChange={(e) => {
                    // TODO: Handle file upload
                    console.log('File selected:', e.target.files?.[0]);
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={`${isRecording ? 'bg-red-500 text-white' : ''}`}
                onClick={toggleRecording}
                disabled={isSendingMessage}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>

              <Button
                type="submit"
                disabled={!input.trim() || isSendingMessage}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 min-w-[44px]"
              >
                {isSendingMessage ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Bot className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </form>
      </Card>

      {/* Mode Info */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-full px-3 py-1">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>
            {selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)} mode active
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;