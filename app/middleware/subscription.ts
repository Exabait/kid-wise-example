'use server';

import { cookies } from 'next/headers';

import { getInjection } from '@/di/container';

export const setSubscriptionId = async () => {
  const instrumentationService = getInjection('INSTRUMENTATION_SERVICE');
  return instrumentationService.startSpan(
    { name: 'setSubscriptionId' },
    async () => {
      const subscriptionsController = getInjection('SUBSCRIPTION_CONTROLLER');
      const result = await subscriptionsController.getUserSubscription();

      if (result.data) {
        const cookieStore = cookies();
        cookieStore.set('subscription_id', result.data.id, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 30,
        });
      }
    }
  );
};

export const getSubscriptionId = async () => {
  const instrumentationService = getInjection('INSTRUMENTATION_SERVICE');
  return instrumentationService.startSpan(
    { name: 'getSubscriptionId' },
    async () => {
      const cookieStore = cookies();
      const subscriptionId = cookieStore.get('subscription_id');
      return subscriptionId;
    }
  );
};

export const removeSubscriptionId = async () => {
  const instrumentationService = getInjection('INSTRUMENTATION_SERVICE');
  return instrumentationService.startSpan(
    { name: 'removeSubscriptionId' },
    async () => {
      const cookieStore = cookies();
      cookieStore.delete('subscription_id');
    }
  );
};
