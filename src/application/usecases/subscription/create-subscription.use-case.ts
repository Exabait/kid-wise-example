import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { ICreateSubscription } from '@/src/entities/models/subscription';

import { ISubscriptionsRepository } from '../../repositories/subscription.repository.interface';

export type ICreateSubscriptionUseCase = ReturnType<
  typeof CreateSubscriptionUseCase
>;

export function CreateSubscriptionUseCase(
  instrumentationService: IInstrumentationService,
  subscriptionsRepository: ISubscriptionsRepository
) {
  return {
    async execute(subscription: ICreateSubscription) {
      return instrumentationService.startSpan(
        { name: 'createSubscription useCase' },
        async () => {
          const existingSubscriptions =
            await subscriptionsRepository.getAllUserSubscriptions(
              subscription.userId
            );

          if (existingSubscriptions.error) {
            return {
              success: false,
              error: 'failed to check existing subscriptions',
            };
          }

          if (existingSubscriptions.data && existingSubscriptions.data.length) {
            await Promise.all(
              existingSubscriptions.data.map(async s => {
                if (s.status === 'pending') {
                  return subscriptionsRepository.deleteSubscription(s.id);
                }
              })
            );
          }

          return subscriptionsRepository.createSubscription(subscription);
        }
      );
    },
  };
}
