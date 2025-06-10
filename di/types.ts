import { IAIService } from '@src/application/services/ai.service.interface';
import { IInstrumentationService } from '@src/application/services/instrumentation.service.interface';

import { IExplanationRepository } from '@/src/application/repositories/explanation.repository.interface';
import { IImageRepository } from '@/src/application/repositories/image.repository.interface';
import { ISubscriptionsRepository } from '@/src/application/repositories/subscription.repository.interface';
import { IUsersRepository } from '@/src/application/repositories/users.repository.interface';
import { IAuthenticationService } from '@/src/application/services/authentication.service.interface';
import { ISupabaseService } from '@/src/application/services/supabase.service.interface';
import { IAuthPKCEUseCase } from '@/src/application/usecases/auth/auth-pkce.use-case';
import { ISignInUseCase } from '@/src/application/usecases/auth/sign-in.use-case';
import { ISignOutUseCase } from '@/src/application/usecases/auth/sign-out.use-case';
import { IFindWordExplanationUseCase } from '@/src/application/usecases/explanation/find-word-explanation.use-case';
import { IGenerateExplanationImageUseCase } from '@/src/application/usecases/explanation/generate-explanation-image.use-case';
import { IGenerateWordExplanationUseCase } from '@/src/application/usecases/explanation/generate-word-explanation.use-case';
import { ISaveWordExplanationUseCase } from '@/src/application/usecases/explanation/save-word-explanation.use-case';
import { IUpdateWordExplanationUseCase } from '@/src/application/usecases/explanation/update-word-explanation.use-case';
import { ICancelSubscriptionUseCase } from '@/src/application/usecases/subscription/cancel-subscription.use-case';
import { ICreateSubscriptionUseCase } from '@/src/application/usecases/subscription/create-subscription.use-case';
import { IGenerateSubscriptionCheckoutUseCase } from '@/src/application/usecases/subscription/generate-subscription-checkout.use-case';
import { IGetSubscriptionFormUseCase } from '@/src/application/usecases/subscription/get-subscription-form.use-case';
import { IGetUserSubscriptionUseCase } from '@/src/application/usecases/subscription/get-user-subscription.use-case';
import { IHandlePaymentCallbackUseCase } from '@/src/application/usecases/subscription/handle-payment-callback.use-case';
import { IGetUserUseCase } from '@/src/application/usecases/users/get-user.use-case';
import { IAuthController } from '@/src/interface-adapters/controllers/auth.controller';
import { IExplainController } from '@/src/interface-adapters/controllers/explain.controller';
import { IGetUserController } from '@/src/interface-adapters/controllers/get-user.controller';
import { ISubscriptionsController } from '@/src/interface-adapters/controllers/subscription.controller';

export const DI_SYMBOLS = {
  // Services
  AI_SERVICE: Symbol.for('AI_SERVICE'),
  INSTRUMENTATION_SERVICE: Symbol.for('INSTRUMENTATION_SERVICE'),
  SUPABASE_SERVICE: Symbol.for('SUPABASE_SERVICE'),
  AUTHENTICATION_SERVICE: Symbol.for('AUTHENTICATION_SERVICE'),

  // Use Cases
  FIND_WORD_EXPLANATION_USE_CASE: Symbol.for('FIND_WORD_EXPLANATION_USE_CASE'),
  GENERATE_WORD_EXPLANATION_USE_CASE: Symbol.for(
    'GENERATE_WORD_EXPLANATION_USE_CASE'
  ),
  SAVE_WORD_EXPLANATION_USE_CASE: Symbol.for('SAVE_WORD_EXPLANATION_USE_CASE'),
  UPDATE_WORD_EXPLANATION_USE_CASE: Symbol.for(
    'UPDATE_WORD_EXPLANATION_USE_CASE'
  ),
  // UPDATE_PHRASE_EXPLANATION_USE_CASE: Symbol.for('UPDATE_PHRASE_EXPLANATION_USE_CASE'),
  GENERATE_EXPLANATION_IMAGE_USE_CASE: Symbol.for(
    'GENERATE_EXPLANATION_IMAGE_USE_CASE'
  ),

  SIGN_IN_USE_CASE: Symbol.for('SIGN_IN_USE_CASE'),
  GET_USER_USE_CASE: Symbol.for('GET_USER_USE_CASE'),
  AUTH_PKCE_USE_CASE: Symbol.for('AUTH_PKCE_USE_CASE'),
  SIGN_OUT_USE_CASE: Symbol.for('SIGN_OUT_USE_CASE'),

  GET_SUBSCRIPTION_FORM_USE_CASE: Symbol.for('GET_SUBSCRIPTION_FORM_USE_CASE'),
  HANDLE_PAYMENT_CALLBACK_USE_CASE: Symbol.for(
    'HANDLE_PAYMENT_CALLBACK_USE_CASE'
  ),
  CREATE_SUBSCRIPTION_USE_CASE: Symbol.for('CREATE_SUBSCRIPTION_USE_CASE'),
  GET_USER_SUBSCRIPTION_USE_CASE: Symbol.for('GET_USER_SUBSCRIPTION_USE_CASE'),
  CANCEL_SUBSCRIPTION_USE_CASE: Symbol.for('CANCEL_SUBSCRIPTION_USE_CASE'),
  GENERATE_SUBSCRIPTION_CHECKOUT_USE_CASE: Symbol.for(
    'GENERATE_SUBSCRIPTION_CHECKOUT_USE_CASE'
  ),

  // Repositories
  EXPLANATION_REPOSITORY: Symbol.for('EXPLANATION_REPOSITORY'),
  USERS_REPOSITORY: Symbol.for('USERS_REPOSITORY'),
  SUBSCRIPTIONS_REPOSITORY: Symbol.for('SUBSCRIPTIONS_REPOSITORY'),
  IMAGE_REPOSITORY: Symbol.for('IMAGE_REPOSITORY'),

  // Controllers
  EXPLAIN_CONTROLLER: Symbol.for('EXPLAIN_CONTROLLER'),
  AUTH_CONTROLLER: Symbol.for('AUTH_CONTROLLER'),
  GET_USER_CONTROLLER: Symbol.for('GET_USER_CONTROLLER'),
  SUBSCRIPTION_CONTROLLER: Symbol.for('SUBSCRIPTION_CONTROLLER'),
};

export interface DI_RETURN_TYPES {
  // Services
  AI_SERVICE: IAIService;
  INSTRUMENTATION_SERVICE: IInstrumentationService;
  SUPABASE_SERVICE: ISupabaseService;
  AUTHENTICATION_SERVICE: IAuthenticationService;

  // Repositories
  EXPLANATION_REPOSITORY: IExplanationRepository;
  USERS_REPOSITORY: IUsersRepository;
  SUBSCRIPTIONS_REPOSITORY: ISubscriptionsRepository;
  IMAGE_REPOSITORY: IImageRepository;

  // Use Cases
  FIND_WORD_EXPLANATION_USE_CASE: IFindWordExplanationUseCase;
  GENERATE_WORD_EXPLANATION_USE_CASE: IGenerateWordExplanationUseCase;
  SAVE_WORD_EXPLANATION_USE_CASE: ISaveWordExplanationUseCase;
  UPDATE_WORD_EXPLANATION_USE_CASE: IUpdateWordExplanationUseCase;
  // UPDATE_PHRASE_EXPLANATION_USE_CASE: IUpdatePhraseExplanationUseCase;
  GENERATE_EXPLANATION_IMAGE_USE_CASE: IGenerateExplanationImageUseCase;

  SIGN_IN_USE_CASE: ISignInUseCase;
  GET_USER_USE_CASE: IGetUserUseCase;
  AUTH_PKCE_USE_CASE: IAuthPKCEUseCase;
  SIGN_OUT_USE_CASE: ISignOutUseCase;

  GET_SUBSCRIPTION_FORM_USE_CASE: IGetSubscriptionFormUseCase;
  HANDLE_PAYMENT_CALLBACK_USE_CASE: IHandlePaymentCallbackUseCase;
  CREATE_SUBSCRIPTION_USE_CASE: ICreateSubscriptionUseCase;
  GET_USER_SUBSCRIPTION_USE_CASE: IGetUserSubscriptionUseCase;
  CANCEL_SUBSCRIPTION_USE_CASE: ICancelSubscriptionUseCase;
  GENERATE_SUBSCRIPTION_CHECKOUT_USE_CASE: IGenerateSubscriptionCheckoutUseCase;

  // Controllers
  EXPLAIN_CONTROLLER: IExplainController;
  AUTH_CONTROLLER: IAuthController;
  GET_USER_CONTROLLER: IGetUserController;
  SUBSCRIPTION_CONTROLLER: ISubscriptionsController;
}
