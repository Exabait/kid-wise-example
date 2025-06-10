import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';

import { ISubscriptionsRepository } from '../../repositories/subscription.repository.interface';

export type IGetUserSubscriptionUseCase = ReturnType<
  typeof GetUserSubscriptionUseCase
>;

export function GetUserSubscriptionUseCase(
  instrumentationService: IInstrumentationService,
  subscriptionsRepository: ISubscriptionsRepository
) {
  return {
    async execute(userId: string) {
      return instrumentationService.startSpan(
        { name: 'getUserSubscription useCase' },
        async () => {
          return subscriptionsRepository.getUserSubscription(userId);
        }
      );
    },
  };
}
