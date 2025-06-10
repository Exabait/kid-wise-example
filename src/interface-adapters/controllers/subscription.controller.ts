import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { ICancelSubscriptionUseCase } from '@/src/application/usecases/subscription/cancel-subscription.use-case';
import { ICreateSubscriptionUseCase } from '@/src/application/usecases/subscription/create-subscription.use-case';
import { IGenerateSubscriptionCheckoutUseCase } from '@/src/application/usecases/subscription/generate-subscription-checkout.use-case';
import { IGetSubscriptionFormUseCase } from '@/src/application/usecases/subscription/get-subscription-form.use-case';
import { IGetUserSubscriptionUseCase } from '@/src/application/usecases/subscription/get-user-subscription.use-case';
import { IGetUserUseCase } from '@/src/application/usecases/users/get-user.use-case';
import { UnauthorizedError } from '@/src/entities/errors/auth';
import {
  ICreateSubscription,
  SubscriptionCheckoutOptions,
  SubscriptionFormOptions,
} from '@/src/entities/models/subscription';

import { IHandlePaymentCallbackUseCase } from '../../application/usecases/subscription/handle-payment-callback.use-case';

export type ISubscriptionsController = ReturnType<
  typeof SubscriptionsController
>;

export function SubscriptionsController(
  instrumentationService: IInstrumentationService,
  getSubscriptionFormUseCase: IGetSubscriptionFormUseCase,
  handlePaymentCallbackUseCase: IHandlePaymentCallbackUseCase,
  createSubscriptionUseCase: ICreateSubscriptionUseCase,
  getUserUseCase: IGetUserUseCase,
  getUserSubscriptionUseCase: IGetUserSubscriptionUseCase,
  cancelSubscriptionUseCase: ICancelSubscriptionUseCase,
  generateSubscriptionCheckoutUseCase: IGenerateSubscriptionCheckoutUseCase
) {
  return {
    async getUserSubscription() {
      return await instrumentationService.startSpan(
        { name: 'getUserSubscription' },
        async () => {
          const user = await getUserUseCase.execute();

          if (!user) {
            throw new UnauthorizedError('User not found');
          }

          return getUserSubscriptionUseCase.execute(user.id);
        }
      );
    },
    async getSubscriptionForm(formOptions: SubscriptionFormOptions) {
      return await instrumentationService.startSpan(
        { name: 'getSubscriptionForm' },
        async () => {
          return getSubscriptionFormUseCase.execute(formOptions);
        }
      );
    },
    async generateSubscriptionCheckout(
      checkoutOptions: SubscriptionCheckoutOptions
    ) {
      return await instrumentationService.startSpan(
        { name: 'generateSubscriptionCheckout' },
        async () => {
          return generateSubscriptionCheckoutUseCase.execute(checkoutOptions);
        }
      );
    },
    async createSubscription(
      subscription: Omit<ICreateSubscription, 'userId'>
    ) {
      return await instrumentationService.startSpan(
        { name: 'createSubscription' },
        async () => {
          const user = await getUserUseCase.execute();

          if (!user) {
            throw new UnauthorizedError('User not found');
          }

          return createSubscriptionUseCase.execute({
            ...subscription,
            userId: user.id,
          });
        }
      );
    },
    async cancelSubscription(subscriptionId: string) {
      return await instrumentationService.startSpan(
        { name: 'cancelSubscription' },
        async () => {
          return cancelSubscriptionUseCase.execute(subscriptionId);
        }
      );
    },
    async handlePaymentCallback(data: any) {
      return await instrumentationService.startSpan(
        { name: 'handlePaymentCallback' },
        async () => {
          return handlePaymentCallbackUseCase.execute(data);
        }
      );
    },
  };
}
