'use server';

import { NextRequest, NextResponse } from 'next/server';

export async function checkExplanationsLimit(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const countCookie = req.cookies.get('explanation_count');
  const resetCookie = req.cookies.get('explanation_reset');
  let count = countCookie ? parseInt(countCookie.value, 10) : 0;
  let reset = resetCookie ? parseInt(resetCookie.value, 10) : 0;

  const now = Date.now();

  const d = new Date();
  d.setHours(24, 0, 0, 0);
  const nextMidnight = d.getTime();

  if (!reset || now > reset) {
    count = 0;
    reset = nextMidnight;
  }
  if (count >= 3) {
    return NextResponse.redirect(new URL('/settings', req.url));
  }

  res.cookies.set('explanation_count', String(count + 1), {
    expires: new Date(reset),
  });
  res.cookies.set('explanation_reset', String(reset), {
    expires: new Date(reset),
  });

  return res;
}

export async function setLastExplanationRequest(
  response: NextResponse,
  query: string
): Promise<void> {
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  response.cookies.set('last_explanation_request', query, {
    expires: endOfDay,
  });
}
