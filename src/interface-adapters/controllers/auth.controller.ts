import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { IAuthPKCEUseCase } from '@/src/application/usecases/auth/auth-pkce.use-case';
import { ISignInUseCase } from '@/src/application/usecases/auth/sign-in.use-case';
import { ISignOutUseCase } from '@/src/application/usecases/auth/sign-out.use-case';

export type IAuthController = ReturnType<typeof AuthController>;

export function AuthController(
  signInUseCase: ISignInUseCase,
  instrumentationService: IInstrumentationService,
  authPKCEUseCase: IAuthPKCEUseCase,
  signOutUseCase: ISignOutUseCase
) {
  return {
    async signIn() {
      return await instrumentationService.startSpan(
        { name: 'AuthController.signIn' },
        async () => {
          return signInUseCase.execute();
        }
      );
    },
    async authPKCE(code: string) {
      return await instrumentationService.startSpan(
        { name: 'AuthController.authPKCE' },
        async () => {
          return authPKCEUseCase.execute(code);
        }
      );
    },
    async signOut() {
      return await instrumentationService.startSpan(
        { name: 'AuthController.signOut' },
        async () => {
          return signOutUseCase.execute();
        }
      );
    },
  };
}
