import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface User {
    id: string;
    email: string;
    name: string;
    website?: string;
    created_at: string;
    updated_at: string;
}

export interface UserDashboard {
    id: string;
    user_id: string;
    goal?: string;
    income?: number;
    clients?: number;
    created_at: string;
    updated_at: string;
}
