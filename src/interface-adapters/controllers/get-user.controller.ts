import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { IGetUserUseCase } from '@/src/application/usecases/users/get-user.use-case';
import { NotFoundError } from '@/src/entities/errors/common';
import { User, UserPresentation } from '@/src/entities/models/user';

function presenter(
  user: User,
  instrumentationService: IInstrumentationService
): UserPresentation {
  return instrumentationService.startSpan(
    { name: 'GetUserController.presenter' },
    () => {
      return {
        id: user.id,
        name: user.full_name,
        email: user.email,
        avatarUrl: user.avatar_url,
      };
    }
  );
}

export type IGetUserController = ReturnType<typeof GetUserController>;

export function GetUserController(
  instrumentationService: IInstrumentationService,
  getUserUseCase: IGetUserUseCase
) {
  return {
    async getCurrentUser() {
      return await instrumentationService.startSpan(
        { name: 'GetUserController' },
        async () => {
          const user = await getUserUseCase.execute();

          if (!user) {
            throw new NotFoundError('User not found');
          }

          return presenter(user, instrumentationService);
        }
      );
    },
  };
}
