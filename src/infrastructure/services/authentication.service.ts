import { Session, User } from '@supabase/supabase-js';

import { IAuthenticationService } from '@/src/application/services/authentication.service.interface';
import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { ISupabaseService } from '@/src/application/services/supabase.service.interface';
import { AppResponse } from '@/src/entities/common';

export class AuthenticationService implements IAuthenticationService {
  constructor(
    private readonly supabaseService: ISupabaseService,
    private readonly instrumentationService: IInstrumentationService
  ) {}

  async signInWithGoogle() {
    const supabaseClient = await this.supabaseService.getClientSSR();
    const baseUrl =
      process?.env?.NEXT_PUBLIC_APP_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/';

    const { data } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${baseUrl}/api/auth/callback` },
    });
    return { data: { url: data.url! } };
  }

  async exchangeCodeForSession(code: string): Promise<
    AppResponse<{
      session: Session;
      user: User;
    }>
  > {
    const supabaseClient = await this.supabaseService.getClientSSR();
    const { error, data } =
      await supabaseClient.auth.exchangeCodeForSession(code);
    if (error) {
      this.instrumentationService.createLog(
        `Error exchanging code for session: ${error.message}`
      );
      return { data: null, error: error.message };
    }
    return { data: { session: data.session, user: data.user } };
  }

  async signOut() {
    const supabaseClient = await this.supabaseService.getClientSSR();
    await supabaseClient.auth.signOut();
  }
}
