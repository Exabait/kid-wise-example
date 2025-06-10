import { createModule } from '@evyweb/ioctopus';

import { DI_SYMBOLS } from '@/di/types';
import { CancelSubscriptionUseCase } from '@/src/application/usecases/subscription/cancel-subscription.use-case';
import { CreateSubscriptionUseCase } from '@/src/application/usecases/subscription/create-subscription.use-case';
import { GenerateSubscriptionCheckoutUseCase } from '@/src/application/usecases/subscription/generate-subscription-checkout.use-case';
import { GetSubscriptionFormUseCase } from '@/src/application/usecases/subscription/get-subscription-form.use-case';
import { GetUserSubscriptionUseCase } from '@/src/application/usecases/subscription/get-user-subscription.use-case';
import { HandlePaymentCallbackUseCase } from '@/src/application/usecases/subscription/handle-payment-callback.use-case';
import { SubscriptionsRepository } from '@/src/infrastructure/repositories/subscriptions.repository';
import { SubscriptionsController } from '@/src/interface-adapters/controllers/subscription.controller';

export function createSubscriptionModule() {
  const module = createModule();

  // Repository
  module
    .bind(DI_SYMBOLS.SUBSCRIPTIONS_REPOSITORY)
    .toClass(SubscriptionsRepository, [DI_SYMBOLS.SUPABASE_SERVICE]);

  // Use Cases
  module
    .bind(DI_SYMBOLS.GET_SUBSCRIPTION_FORM_USE_CASE)
    .toHigherOrderFunction(GetSubscriptionFormUseCase, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.SUBSCRIPTIONS_REPOSITORY,
    ]);
  module
    .bind(DI_SYMBOLS.HANDLE_PAYMENT_CALLBACK_USE_CASE)
    .toHigherOrderFunction(HandlePaymentCallbackUseCase, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.SUBSCRIPTIONS_REPOSITORY,
    ]);
  module
    .bind(DI_SYMBOLS.CREATE_SUBSCRIPTION_USE_CASE)
    .toHigherOrderFunction(CreateSubscriptionUseCase, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.SUBSCRIPTIONS_REPOSITORY,
    ]);
  module
    .bind(DI_SYMBOLS.GET_USER_SUBSCRIPTION_USE_CASE)
    .toHigherOrderFunction(GetUserSubscriptionUseCase, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.SUBSCRIPTIONS_REPOSITORY,
    ]);
  module
    .bind(DI_SYMBOLS.CANCEL_SUBSCRIPTION_USE_CASE)
    .toHigherOrderFunction(CancelSubscriptionUseCase, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.SUBSCRIPTIONS_REPOSITORY,
    ]);
  module
    .bind(DI_SYMBOLS.GENERATE_SUBSCRIPTION_CHECKOUT_USE_CASE)
    .toHigherOrderFunction(GenerateSubscriptionCheckoutUseCase, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.SUBSCRIPTIONS_REPOSITORY,
    ]);

  // Controller
  module
    .bind(DI_SYMBOLS.SUBSCRIPTION_CONTROLLER)
    .toHigherOrderFunction(SubscriptionsController, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.GET_SUBSCRIPTION_FORM_USE_CASE,
      DI_SYMBOLS.HANDLE_PAYMENT_CALLBACK_USE_CASE,
      DI_SYMBOLS.CREATE_SUBSCRIPTION_USE_CASE,
      DI_SYMBOLS.GET_USER_USE_CASE,
      DI_SYMBOLS.GET_USER_SUBSCRIPTION_USE_CASE,
      DI_SYMBOLS.CANCEL_SUBSCRIPTION_USE_CASE,
      DI_SYMBOLS.GENERATE_SUBSCRIPTION_CHECKOUT_USE_CASE,
    ]);

  return module;
}
