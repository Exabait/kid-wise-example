import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';

import { IUsersRepository } from '../../repositories/users.repository.interface';

export type IGetUserUseCase = ReturnType<typeof GetUserUseCase>;

export function GetUserUseCase(
  instrumentationService: IInstrumentationService,
  usersRepository: IUsersRepository
) {
  return {
    async execute() {
      return await instrumentationService.startSpan(
        { name: 'GetUserUseCase' },
        async () => {
          return usersRepository.getCurrentUser();
        }
      );
    },
  };
}
