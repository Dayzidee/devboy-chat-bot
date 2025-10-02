import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useChatStore } from '@/stores/chatStore';
import { useToast } from '@/hooks/use-toast';
import type { User, Session } from '@supabase/supabase-js';

export const useAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    setUser, 
    setAuthenticated, 
    reset, 
    user, 
    isAuthenticated 
  } = useChatStore();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await handleUserSession(session.user, session);
        } else {
          handleSignOut();
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        handleUserSession(session.user, session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUserSession = async (authUser: User, session: Session) => {
    try {
      // Fetch or create user profile
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (profile) {
        const userProfile = {
          ...profile,
          preferences: profile.preferences as Record<string, any> || {},
          oauth_providers: profile.oauth_providers as string[] || [],
          subscription: profile.subscription as { plan: string; status: string } || { plan: 'free', status: 'active' }
        };
        setUser(userProfile);
        setAuthenticated(true);
      }
    } catch (error) {
      console.error('Error handling user session:', error);
      toast({
        title: "Authentication Error",
        description: "Failed to load user profile",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setAuthenticated(false);
    reset();
  };

  const signUp = async (email: string, password: string, username?: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username: username || email.split('@')[0]
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });

      return { error: null };
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });

      navigate('/chat');
      return { error: null };
    } catch (error: any) {
      console.error('Signin error:', error);
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/chat`
        }
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Google signin error:', error);
      toast({
        title: "Google Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signInWithGithub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/chat`
        }
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('GitHub signin error:', error);
      toast({
        title: "GitHub Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });

      navigate('/');
    } catch (error: any) {
      console.error('Signout error:', error);
      toast({
        title: "Sign Out Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Password reset sent",
        description: "Check your email for password reset instructions.",
      });

      return { error: null };
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast({
        title: "Password Reset Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  return {
    user,
    isAuthenticated,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithGithub,
    signOut,
    resetPassword,
  };
};