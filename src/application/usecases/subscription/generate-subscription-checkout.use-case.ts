import { SubscriptionCheckoutOptions } from '@/src/entities/models/subscription';

import { ISubscriptionsRepository } from '../../repositories/subscription.repository.interface';
import { IInstrumentationService } from '../../services/instrumentation.service.interface';

export type IGenerateSubscriptionCheckoutUseCase = ReturnType<
  typeof GenerateSubscriptionCheckoutUseCase
>;

export function GenerateSubscriptionCheckoutUseCase(
  instrumentationService: IInstrumentationService,
  subscriptionsRepository: ISubscriptionsRepository
) {
  return {
    async execute(options: SubscriptionCheckoutOptions) {
      return await instrumentationService.startSpan(
        { name: 'GenerateSubscriptionCheckoutUseCase' },
        async () => {
          return subscriptionsRepository.getSubscriptionCheckout(options);
        }
      );
    },
  };
}
