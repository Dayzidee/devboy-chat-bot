import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Settings, MoreVertical, Brain, Zap, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useChatStore } from '@/stores/chatStore';
import type { AIModel } from '@/types/chat';

const ChatHeader = () => {
  const { 
    currentChat, 
    selectedAI, 
    setSelectedAI, 
    selectedMode,
    updateChat 
  } = useChatStore();

  const aiModelIcons = {
    openai: Brain,
    claude: Zap,
    gemini: Code
  };

  const aiModelNames = {
    openai: 'GPT-4',
    claude: 'Claude',
    gemini: 'Gemini'
  };

  const handleAIChange = (model: AIModel) => {
    setSelectedAI(model);
    if (currentChat) {
      updateChat(currentChat.id, { ai_model: model });
    }
  };

  const getCurrentTitle = () => {
    if (currentChat) {
      return currentChat.title;
    }
    return `New ${selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)} Chat`;
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3">
        <SidebarTrigger className="lg:hidden" />
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">{getCurrentTitle()}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {selectedMode}
              </Badge>
              {currentChat && (
                <span>•</span>
              )}
              <span>
                {currentChat ? 
                  new Date(currentChat.created_at).toLocaleDateString() : 
                  'Today'
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* AI Model Selector */}
        <Select value={selectedAI} onValueChange={handleAIChange}>
          <SelectTrigger className="w-32">
            <div className="flex items-center gap-2">
              {React.createElement(aiModelIcons[selectedAI], { className: "w-4 h-4" })}
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(aiModelNames).map(([key, name]) => {
              const Icon = aiModelIcons[key as AIModel];
              return (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{name}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {/* More Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Chat Settings
            </DropdownMenuItem>
            {currentChat && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Export Chat
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Delete Chat
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};

export default ChatHeader;