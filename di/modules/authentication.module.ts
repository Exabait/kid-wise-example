import { createModule } from '@evyweb/ioctopus';

import { AuthPKCEUseCase } from '@/src/application/usecases/auth/auth-pkce.use-case';
import { SignInUseCase } from '@/src/application/usecases/auth/sign-in.use-case';
import { SignOutUseCase } from '@/src/application/usecases/auth/sign-out.use-case';
import { AuthenticationService } from '@/src/infrastructure/services/authentication.service';
import { AuthController } from '@/src/interface-adapters/controllers/auth.controller';

import { DI_SYMBOLS } from '../types';

export function createAuthenticationModule() {
  const module = createModule();

  module
    .bind(DI_SYMBOLS.SIGN_IN_USE_CASE)
    .toHigherOrderFunction(SignInUseCase, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.AUTHENTICATION_SERVICE,
    ]);
  module
    .bind(DI_SYMBOLS.AUTH_PKCE_USE_CASE)
    .toHigherOrderFunction(AuthPKCEUseCase, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.AUTHENTICATION_SERVICE,
    ]);
  module
    .bind(DI_SYMBOLS.SIGN_OUT_USE_CASE)
    .toHigherOrderFunction(SignOutUseCase, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.AUTHENTICATION_SERVICE,
    ]);

  module
    .bind(DI_SYMBOLS.AUTHENTICATION_SERVICE)
    .toClass(AuthenticationService, [
      DI_SYMBOLS.SUPABASE_SERVICE,
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
    ]);

  module
    .bind(DI_SYMBOLS.AUTH_CONTROLLER)
    .toHigherOrderFunction(AuthController, [
      DI_SYMBOLS.SIGN_IN_USE_CASE,
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.AUTH_PKCE_USE_CASE,
      DI_SYMBOLS.SIGN_OUT_USE_CASE,
    ]);

  return module;
}
