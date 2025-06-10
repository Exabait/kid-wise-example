import { IAuthenticationService } from '@/src/application/services/authentication.service.interface';
import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';

export type ISignOutUseCase = ReturnType<typeof SignOutUseCase>;

export function SignOutUseCase(
  instrumentationService: IInstrumentationService,
  authenticationService: IAuthenticationService
) {
  return {
    execute: async () => {
      await instrumentationService.startSpan({ name: 'signOut' }, async () => {
        await authenticationService.signOut();
      });
    },
  };
}
