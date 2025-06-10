'use server';

import { cookies } from 'next/headers';

import { getInjection } from '@/di/container';
import { UnauthorizedError } from '@/src/entities/errors/auth';
import { ICreateSubscription } from '@/src/entities/models/subscription';

export async function getUserSubscription() {
  const instrumentationService = getInjection('INSTRUMENTATION_SERVICE');
  return await instrumentationService.startSpan(
    { name: 'getUserSubscription' },
    async () => {
      try {
        const subscriptionsController = getInjection('SUBSCRIPTION_CONTROLLER');
        const result = await subscriptionsController.getUserSubscription();

        return result;
      } catch (error) {
        console.error('Failed to get user subscription', error);

        if (error instanceof UnauthorizedError) {
          return {
            data: null,
            error: 'Cannot get user subscription. User is not authorized.',
          };
        }

        return { error: 'Failed to get user subscription', data: null };
      }
    }
  );
}

export async function getMonthlySubscriptionCheckout() {
  const instrumentationService = getInjection('INSTRUMENTATION_SERVICE');
  return await instrumentationService.startSpan(
    { name: 'getMonthlySubscriptionCheckout' },
    async () => {
      try {
        const subscriptionsController = getInjection('SUBSCRIPTION_CONTROLLER');
        const data = await subscriptionsController.generateSubscriptionCheckout(
          {
            description: 'Monthly Subscription',
            callbackUrl:
              process.env.NEXT_PUBLIC_APP_URL + '/api/subscriptions/callback', // POST (webhook)
            redirectUrl:
              process.env.NEXT_PUBLIC_APP_URL + '/settings?fromCheckout=true', // GET (redirect)
            amount: '5',
            currency: 'USD',
            subscribe_periodicity: 'month',
          }
        );
        return data;
      } catch (error) {
        console.error(
          'Failed to generate monthly subscription checkout',
          error
        );
        return {
          error: 'Failed to generate monthly subscription checkout',
          data: null,
        };
      }
    }
  );
}

export async function getYearlySubscriptionCheckout() {
  const instrumentationService = getInjection('INSTRUMENTATION_SERVICE');
  return await instrumentationService.startSpan(
    { name: 'getYearlySubscriptionCheckout' },
    async () => {
      try {
        const subscriptionsController = getInjection('SUBSCRIPTION_CONTROLLER');
        const data = await subscriptionsController.generateSubscriptionCheckout(
          {
            description: 'Yearly Subscription',
            callbackUrl:
              process.env.NEXT_PUBLIC_APP_URL + '/api/subscriptions/callback', // POST (webhook)
            redirectUrl:
              process.env.NEXT_PUBLIC_APP_URL + '/settings?fromCheckout=true', // GET (redirect)
            amount: '50',
            currency: 'USD',
            subscribe_periodicity: 'year',
          }
        );
        return data;
      } catch (error) {
        console.error('Failed to generate yearly subscription checkout', error);
        return {
          error: 'Failed to generate yearly subscription checkout',
          data: null,
        };
      }
    }
  );
}

export async function createSubscription(
  subscription: Omit<ICreateSubscription, 'userId'>
) {
  const instrumentationService = getInjection('INSTRUMENTATION_SERVICE');
  return await instrumentationService.startSpan(
    { name: 'createSubscription' },
    async () => {
      try {
        const subscriptionsController = getInjection('SUBSCRIPTION_CONTROLLER');
        return await subscriptionsController.createSubscription(subscription);
      } catch (error) {
        console.error('Failed to create subscription', error);
        return { success: false, error: 'Failed to create subscription' };
      }
    }
  );
}

export async function cancelSubscription(subscriptionId: string) {
  const instrumentationService = getInjection('INSTRUMENTATION_SERVICE');
  return await instrumentationService.startSpan(
    { name: 'cancelSubscription' },
    async () => {
      try {
        const subscriptionsController = getInjection('SUBSCRIPTION_CONTROLLER');
        return await subscriptionsController.cancelSubscription(subscriptionId);
      } catch (error) {
        console.error('Failed to cancel subscription', error);
        return { success: false, error: 'Failed to cancel subscription' };
      }
    }
  );
}

export async function getExplanationLimitInfo() {
  const cookieStore = cookies();
  const countCookie = cookieStore.get('explanation_count');
  const resetCookie = cookieStore.get('explanation_reset');
  const count = countCookie ? parseInt(countCookie.value, 10) : 0;
  const reset = resetCookie ? parseInt(resetCookie.value, 10) : 0;
  return {
    explanationCount: isNaN(count) ? 0 : count,
    resetTime: isNaN(reset) ? null : reset,
  };
}
