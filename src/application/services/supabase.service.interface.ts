import { SupabaseClient } from '@supabase/supabase-js';

export interface ISupabaseService {
  getClient(): SupabaseClient;
  getClientWithServiceRole(): SupabaseClient;
  getClientSSR(): Promise<SupabaseClient>;
}
