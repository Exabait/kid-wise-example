import { createContainer } from '@evyweb/ioctopus';

import { createAIModule } from './modules/ai.module';
import { createAuthenticationModule } from './modules/authentication.module';
import { createExplanationModule } from './modules/explanation.module';
import { createInfrastructureModule } from './modules/infrastructure.module';
import { createMonitoringModule } from './modules/monitoring.module';
import { createSubscriptionModule } from './modules/subscription.module';
import { createUsersModule } from './modules/users.module';
import { DI_RETURN_TYPES, DI_SYMBOLS } from './types';

const container = createContainer();

container.load(Symbol('ExplanationModule'), createExplanationModule());
container.load(Symbol('AIModule'), createAIModule());
container.load(Symbol('MonitoringModule'), createMonitoringModule());
container.load(Symbol('UsersModule'), createUsersModule());
container.load(Symbol('AuthenticationModule'), createAuthenticationModule());
container.load(Symbol('InfrastructureModule'), createInfrastructureModule());
container.load(Symbol('SubscriptionsModule'), createSubscriptionModule());

export function getInjection<K extends keyof DI_RETURN_TYPES>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return container.get(DI_SYMBOLS[symbol]);
}
