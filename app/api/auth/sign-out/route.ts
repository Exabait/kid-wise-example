import { NextResponse } from 'next/server';

import { removeSubscriptionId } from '@/app/middleware/subscription';
import { getInjection } from '@/di/container';

export async function POST() {
  const instrumentationService = getInjection('INSTRUMENTATION_SERVICE');
  return await instrumentationService.startSpan(
    { name: 'signOut' },
    async () => {
      const authController = getInjection('AUTH_CONTROLLER');
      await authController.signOut();
      const response = NextResponse.json({ success: true });
      response.cookies.delete('sb-access-token');
      response.cookies.delete('sb-refresh-token');
      await removeSubscriptionId();
      return response;
    }
  );
}
