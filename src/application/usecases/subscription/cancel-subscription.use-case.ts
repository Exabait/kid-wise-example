import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';

import { ISubscriptionsRepository } from '../../repositories/subscription.repository.interface';

export type ICancelSubscriptionUseCase = ReturnType<
  typeof CancelSubscriptionUseCase
>;

export function CancelSubscriptionUseCase(
  instrumentationService: IInstrumentationService,
  subscriptionsRepository: ISubscriptionsRepository
) {
  return {
    async execute(subscriptionId: string) {
      return instrumentationService.startSpan(
        { name: 'cancelSubscription useCase' },
        async () => {
          return subscriptionsRepository.cancelSubscription(subscriptionId);
        }
      );
    },
  };
}
