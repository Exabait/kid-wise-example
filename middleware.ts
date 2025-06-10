import {
  checkExplanationsLimit,
  setLastExplanationRequest,
} from '@app/middleware/explanations-limit';
import { getClientIP } from '@app/middleware/ip-utils';
import { setLanguageCookieByIP } from '@app/middleware/language';

import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|.*.png|.*\\..*|_next).*)',
  ],
};

export const middleware = async (req: NextRequest) => {
  const pathName = req.nextUrl.pathname;
  const searchParams = req.nextUrl.searchParams;

  const query = searchParams.get('q');
  const fromCheckout = searchParams.get('fromCheckout');

  let response = NextResponse.next();

  const lastExplanationRequest = req.cookies.get('last_explanation_request');
  const subscriptionId = req.cookies.get('subscription_id');
  const requirementsForExplanationCheck =
    pathName === '/' &&
    query &&
    lastExplanationRequest?.value !== query &&
    !subscriptionId;

  if (requirementsForExplanationCheck) {
    response = await checkExplanationsLimit(req, response);
  }

  if (pathName === '/' && query) {
    await setLastExplanationRequest(response, query);
  }

  const lang = req.cookies.get('lang');
  const ip = getClientIP(req);
  if (!lang?.value) {
    await setLanguageCookieByIP(ip, response);
  }

  return response;
};
