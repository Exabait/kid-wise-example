import { User as SupabaseUser } from '@supabase/supabase-js';

export interface AuthUser extends SupabaseUser {}

export interface User {
  id: string;
  email: string;
  full_name: string;
  username: string;
  avatar_url?: string;
  subscription?: string;
  created_at: string;
  updated_at: string;
}

export interface UserPresentation {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}
