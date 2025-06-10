import { NextResponse } from 'next/server';

import { getInjection } from '@/di/container';

export async function POST(request: Request) {
  const instrumentationService = getInjection('INSTRUMENTATION_SERVICE');
  return instrumentationService.startSpan(
    { name: 'subscriptionsCallbackAPIRoute' },
    async () => {
      const text = await request.text();
      const body = Object.fromEntries(new URLSearchParams(text));

      const subscriptionsController = getInjection('SUBSCRIPTION_CONTROLLER');
      const result = await subscriptionsController.handlePaymentCallback(body);

      return NextResponse.json(result);
    }
  );
}
