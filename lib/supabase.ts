import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper — wraps Supabase Auth for clean usage
export const auth = {
  signUp: async (email: string, password: string, metadata?: { name?: string; favorite_coffee?: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
    if (error) throw error;
    return data;
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// Types for our database
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  favorite_coffee?: string;
  created_at: string;
  updated_at: string;
}

export interface UserDashboard {
  id: string;
  user_id: string;
  goal?: string;
  cups_this_month?: number;
  origins_explored?: number;
  created_at: string;
  updated_at: string;
}

// Keep backward compat alias
export type User = UserProfile;
