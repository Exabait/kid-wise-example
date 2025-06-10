import { Session, User } from '@supabase/supabase-js';

import { AppResponse } from '@/src/entities/common';

export interface IAuthenticationService {
  signInWithGoogle(): Promise<{ data: { url: string } }>;
  exchangeCodeForSession(code: string): Promise<
    AppResponse<{
      session: Session;
      user: User;
    }>
  >;
  signOut(): Promise<void>;
}
