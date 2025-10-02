import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MessageSquare, Settings, LogOut, Bot, Code, Zap, FileCode2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from '@/components/ui/sidebar';
import { useChatStore } from '@/stores/chatStore';
import { useAuth } from '@/hooks/useAuth';
import type { Chat, DevMode } from '@/types/chat';

const ChatSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { 
    chats, 
    currentChat, 
    selectedMode, 
    setCurrentChat, 
    setSelectedMode,
    user 
  } = useChatStore();
  const { signOut } = useAuth();

  const modeIcons = {
    javascript: Code,
    python: FileCode2,
    basic: Bot
  };

  const modeColors = {
    javascript: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    python: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    basic: 'bg-green-500/10 text-green-600 border-green-500/20'
  };

  const handleChatSelect = (chat: Chat) => {
    setCurrentChat(chat);
    setSelectedMode(chat.mode);
  };

  const handleNewChat = () => {
    setCurrentChat(null);
  };

  const handleModeChange = (mode: DevMode) => {
    setSelectedMode(mode);
  };

  const sidebarVariants = {
    open: { width: 280 },
    closed: { width: 64 }
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="font-bold text-lg">DevBot</span>
              <span className="text-xs text-muted-foreground">AI Developer Assistant</span>
            </motion.div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* New Chat Button */}
        <div className="p-4">
          <Button 
            onClick={handleNewChat}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            size={collapsed ? "sm" : "default"}
          >
            <Plus className="w-4 h-4" />
            {!collapsed && <span className="ml-2">New Chat</span>}
          </Button>
        </div>

        {/* Developer Modes */}
        <SidebarGroup>
          <SidebarGroupLabel>Developer Mode</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Object.entries(modeIcons).map(([mode, Icon]) => (
                <SidebarMenuItem key={mode}>
                  <SidebarMenuButton
                    onClick={() => handleModeChange(mode as DevMode)}
                    className={selectedMode === mode ? 'bg-accent' : ''}
            size={collapsed ? "sm" : "default"}
                  >
                    <Icon className="w-4 h-4" />
                    {!collapsed && (
                      <div className="flex items-center justify-between w-full">
                        <span className="capitalize">{mode}</span>
                        {selectedMode === mode && (
                          <Badge variant="secondary" className="ml-auto">Active</Badge>
                        )}
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        {/* Chat History */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-full">
              <SidebarMenu>
                {chats.map((chat) => {
                  const ModeIcon = modeIcons[chat.mode];
                  return (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton
                        onClick={() => handleChatSelect(chat)}
                        className={currentChat?.id === chat.id ? 'bg-accent' : ''}
                    size={collapsed ? "sm" : "default"}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <ModeIcon className="w-4 h-4 flex-shrink-0" />
                          {!collapsed && (
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium truncate">{chat.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(chat.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        {/* User Actions */}
        <div className="p-4 space-y-2">
          {!collapsed && user && (
            <div className="text-sm text-muted-foreground mb-2">
              Signed in as {user.username}
            </div>
          )}
          <Button 
            variant="outline" 
            size="sm"
            className="w-full"
            onClick={() => window.location.href = '/settings'}
          >
            <Settings className="w-4 h-4" />
            {!collapsed && <span className="ml-2">Settings</span>}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="w-full"
            onClick={signOut}
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatSidebar;