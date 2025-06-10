import { NextRequest, NextResponse } from 'next/server';

import { setSubscriptionId } from '@/app/middleware/subscription';
import { getInjection } from '@/di/container';

export async function GET(request: NextRequest) {
  const instrumentationService = getInjection('INSTRUMENTATION_SERVICE');
  return instrumentationService.startSpan(
    { name: 'getAuthCodeAPIRoute' },
    async () => {
      const requestUrl = new URL(request.url);
      const code = requestUrl.searchParams.get('code');
      const appUrl = process.env.NEXT_PUBLIC_APP_URL;
      const redirectUrl = appUrl + '/settings?fromAuth=true';
      const failedRedirect = NextResponse.redirect(appUrl ?? '/');

      if (!code) {
        return failedRedirect;
      }

      const authController = getInjection('AUTH_CONTROLLER');
      const authCheckResponse = await authController.authPKCE(code);
      const authData = authCheckResponse.data;
      if (!authCheckResponse.data || authCheckResponse.error) {
        console.error(
          'Error exchanging code for session in auth callback',
          authCheckResponse
        );
        return failedRedirect;
      }

      const response = NextResponse.redirect(redirectUrl);
      if (authData?.session) {
        response.cookies.set('sb-access-token', authData.session.access_token, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          path: '/',
        });
        response.cookies.set(
          'sb-refresh-token',
          authData.session.refresh_token,
          {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
          }
        );
      }

      await setSubscriptionId();

      return response;
    }
  );
}
