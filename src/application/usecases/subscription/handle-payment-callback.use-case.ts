import { ISubscriptionsRepository } from '../../repositories/subscription.repository.interface';
import { IInstrumentationService } from '../../services/instrumentation.service.interface';

export type IHandlePaymentCallbackUseCase = ReturnType<
  typeof HandlePaymentCallbackUseCase
>;

export function HandlePaymentCallbackUseCase(
  instrumentationService: IInstrumentationService,
  subscriptionsRepository: ISubscriptionsRepository
) {
  return {
    async execute(data: any) {
      return await instrumentationService.startSpan(
        { name: 'HandlePaymentCallbackUseCase' },
        async () => {
          return subscriptionsRepository.handlePaymentCallback(data);
        }
      );
    },
  };
}
