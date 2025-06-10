import {
  Session,
  SupabaseClient,
  User as SupabaseUser,
} from '@supabase/supabase-js';

import { IUsersRepository } from '@/src/application/repositories/users.repository.interface';
import { ISupabaseService } from '@/src/application/services/supabase.service.interface';
import { DatabaseOperationError } from '@/src/entities/errors/common';
import { User } from '@/src/entities/models/user';

export class UsersRepository implements IUsersRepository {
  constructor(private readonly supabaseService: ISupabaseService) {}

  async getCurrentUser(): Promise<User | null> {
    const supabaseClient = await this.supabaseService.getClientSSR();
    const authData = await supabaseClient.auth.getUser();
    const authUser = authData.data.user;

    if (!authUser) return null;

    try {
      return await this.getUserByAuthUser(authUser);
    } catch (error) {
      console.error('getCurrentUser: Error getting user', error);
      return null;
    }
  }

  private async getUserByAuthUser(authUser: SupabaseUser) {
    if (!authUser.email) return null;

    const dbResponseFromAuth = await this.getUserByEmail(authUser.email);
    if (dbResponseFromAuth.error) {
      console.error(
        'getCurrentUser: Error getting user from auth data',
        dbResponseFromAuth.error
      );
      throw new DatabaseOperationError(
        'getCurrentUser: Error getting user from auth data'
      );
    }
    return dbResponseFromAuth.data;
  }

  private async getUserByEmail(email: string) {
    const supabaseClient = await this.supabaseService.getClientSSR();
    return supabaseClient
      .from('profiles')
      .select('*')
      .eq('email', email)
      .maybeSingle<User>();
  }
}
