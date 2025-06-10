import { IAuthenticationService } from '@/src/application/services/authentication.service.interface';
import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';

export type IAuthPKCEUseCase = ReturnType<typeof AuthPKCEUseCase>;

export function AuthPKCEUseCase(
  instrumentationService: IInstrumentationService,
  authenticationService: IAuthenticationService
) {
  return {
    async execute(code: string) {
      return instrumentationService.startSpan(
        { name: 'authPKCEUseCase' },
        async () => {
          return authenticationService.exchangeCodeForSession(code);
        }
      );
    },
  };
}
