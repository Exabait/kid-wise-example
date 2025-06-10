import { NextResponse } from 'next/server';

import { getInjection } from '@/di/container';

export async function GET() {
  const instrumentationService = getInjection('INSTRUMENTATION_SERVICE');
  const result = await instrumentationService.startSpan(
    { name: 'signIn' },
    async () => {
      const authController = getInjection('AUTH_CONTROLLER');
      const result = await authController.signIn();

      if (result && result.url) {
        return { url: result.url };
      }

      return { success: false };
    }
  );
  return NextResponse.json(result);
}
