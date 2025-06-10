import { User } from '@/src/entities/models/user';

export interface IUsersRepository {
  getCurrentUser(): Promise<User | null>;
}
