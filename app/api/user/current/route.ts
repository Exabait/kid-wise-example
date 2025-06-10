import { NextResponse } from 'next/server';

import { getInjection } from '@/di/container';
import { NotFoundError } from '@/src/entities/errors/common';

export async function GET() {
  const instrumentationService = getInjection('INSTRUMENTATION_SERVICE');
  const result = await instrumentationService.startSpan(
    { name: 'getUser' },
    async () => {
      try {
        const getUserController = getInjection('GET_USER_CONTROLLER');
        const user = await getUserController.getCurrentUser();
        console.log('user', user);
        return { data: user };
      } catch (error) {
        if (error instanceof NotFoundError) {
          return { data: null };
        }
        console.error('getUser action error: ', error);
        return { error: 'unhandledError', data: null };
      }
    }
  );
  return NextResponse.json(result);
}
