import { createModule } from '@evyweb/ioctopus';

import { GetUserUseCase } from '@/src/application/usecases/users/get-user.use-case';
import { UsersRepository } from '@/src/infrastructure/repositories/users.repository';
import { GetUserController } from '@/src/interface-adapters/controllers/get-user.controller';

import { DI_SYMBOLS } from '../types';

export function createUsersModule() {
  const module = createModule();

  module
    .bind(DI_SYMBOLS.USERS_REPOSITORY)
    .toClass(UsersRepository, [DI_SYMBOLS.SUPABASE_SERVICE]);

  module
    .bind(DI_SYMBOLS.GET_USER_USE_CASE)
    .toHigherOrderFunction(GetUserUseCase, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.USERS_REPOSITORY,
    ]);

  module
    .bind(DI_SYMBOLS.GET_USER_CONTROLLER)
    .toHigherOrderFunction(GetUserController, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.GET_USER_USE_CASE,
    ]);

  return module;
}
