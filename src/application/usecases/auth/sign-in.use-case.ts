import { IAuthenticationService } from '@/src/application/services/authentication.service.interface';
import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';

export type ISignInUseCase = ReturnType<typeof SignInUseCase>;

export function SignInUseCase(
  instrumentationService: IInstrumentationService,
  authenticationService: IAuthenticationService
) {
  return {
    async execute() {
      return await instrumentationService.startSpan(
        { name: 'SignInUseCase' },
        async () => {
          const { data } = await authenticationService.signInWithGoogle();
          return data;
        }
      );
    },
  };
}
