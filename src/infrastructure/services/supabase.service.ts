import { createServerClient } from '@supabase/ssr';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { cookies } from 'next/headers';

import { ISupabaseService } from '@/src/application/services/supabase.service.interface';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export class SupabaseService implements ISupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  public getClient(): SupabaseClient {
    return this.supabase;
  }

  public getClientWithServiceRole(): SupabaseClient {
    return createClient(supabaseUrl, supabaseServiceRoleKey);
  }

  public async getClientSSR(): Promise<SupabaseClient> {
    const cookieStore = await cookies();

    return await createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          const cookies = cookieStore.getAll();
          return cookies;
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    });
  }
}
