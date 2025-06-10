import { SubscriptionFormOptions } from '@/src/entities/models/subscription';

import { ISubscriptionsRepository } from '../../repositories/subscription.repository.interface';
import { IInstrumentationService } from '../../services/instrumentation.service.interface';

export type IGetSubscriptionFormUseCase = ReturnType<
  typeof GetSubscriptionFormUseCase
>;

export function GetSubscriptionFormUseCase(
  instrumentationService: IInstrumentationService,
  subscriptionsRepository: ISubscriptionsRepository
) {
  return {
    async execute(options: SubscriptionFormOptions) {
      return await instrumentationService.startSpan(
        { name: 'GetSubscriptionFormUseCase' },
        async () => {
          return subscriptionsRepository.createSubscriptionForm(options);
        }
      );
    },
  };
}
