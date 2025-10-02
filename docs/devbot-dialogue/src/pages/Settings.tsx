import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useChatStore } from '@/stores/chatStore';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Bot, User, Moon, Sun } from 'lucide-react';
import { AIModel, DevMode } from '@/types/chat';

export default function Settings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDarkMode, setDarkMode } = useChatStore();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    avatar_url: '',
  });
  const [preferences, setPreferences] = useState({
    defaultAIModel: 'openai' as AIModel,
    defaultDevMode: 'basic' as DevMode,
    autoSaveChats: true,
    showTypingIndicator: true,
    codeHighlighting: true,
    maxChatHistory: 50,
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile({
          username: data.username || '',
          email: data.email || '',
          avatar_url: data.avatar_url || '',
        });

        const prefs = data.preferences as any;
        if (prefs) {
          setPreferences({
            defaultAIModel: prefs.defaultAIModel || 'openai',
            defaultDevMode: prefs.defaultDevMode || 'basic',
            autoSaveChats: prefs.autoSaveChats ?? true,
            showTypingIndicator: prefs.showTypingIndicator ?? true,
            codeHighlighting: prefs.codeHighlighting ?? true,
            maxChatHistory: prefs.maxChatHistory || 50,
          });
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile settings',
        variant: 'destructive',
      });
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: profile.username,
          avatar_url: profile.avatar_url,
          preferences: preferences,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Settings saved successfully',
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/chat')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your chatbot preferences</p>
          </div>
        </div>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                placeholder="Enter username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input
                id="avatar"
                value={profile.avatar_url}
                onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Chatbot Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Chatbot Preferences
            </CardTitle>
            <CardDescription>Configure your AI assistant behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="aiModel">Default AI Model</Label>
              <Select
                value={preferences.defaultAIModel}
                onValueChange={(value) =>
                  setPreferences({ ...preferences, defaultAIModel: value as AIModel })
                }
              >
                <SelectTrigger id="aiModel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI (GPT)</SelectItem>
                  <SelectItem value="claude">Anthropic Claude</SelectItem>
                  <SelectItem value="gemini">Google Gemini</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose your preferred AI model for conversations
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="devMode">Default Developer Mode</Label>
              <Select
                value={preferences.defaultDevMode}
                onValueChange={(value) =>
                  setPreferences({ ...preferences, defaultDevMode: value as DevMode })
                }
              >
                <SelectTrigger id="devMode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript/TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="basic">Basic/General</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Set the default coding context for new chats
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-save Chats</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically save chat history
                  </p>
                </div>
                <Switch
                  checked={preferences.autoSaveChats}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, autoSaveChats: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Typing Indicator</Label>
                  <p className="text-xs text-muted-foreground">
                    Show when AI is generating response
                  </p>
                </div>
                <Switch
                  checked={preferences.showTypingIndicator}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, showTypingIndicator: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Code Highlighting</Label>
                  <p className="text-xs text-muted-foreground">
                    Syntax highlighting for code blocks
                  </p>
                </div>
                <Switch
                  checked={preferences.codeHighlighting}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, codeHighlighting: checked })
                  }
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="maxHistory">Max Chat History</Label>
              <Input
                id="maxHistory"
                type="number"
                min="10"
                max="200"
                value={preferences.maxChatHistory}
                onChange={(e) =>
                  setPreferences({ ...preferences, maxChatHistory: parseInt(e.target.value) })
                }
              />
              <p className="text-xs text-muted-foreground">
                Maximum number of messages to keep in history
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              Appearance
            </CardTitle>
            <CardDescription>Customize the look and feel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-xs text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
              <Switch checked={isDarkMode} onCheckedChange={setDarkMode} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSaveProfile} disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </div>
  );
}
