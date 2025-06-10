'use server';

import { NextResponse } from 'next/server';

export async function setLanguageCookieByIP(ip: string, res: NextResponse) {
  try {
    // Validate IP before making the request
    if (!ip || ip === '127.0.0.1' || ip === '::1') {
      // Default to English for localhost/invalid IPs
      res.cookies.set('lang', 'en', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      return;
    }

    const response = await fetch(
      `https://api.ipinfo.io/lite/${ip}?token=${process.env.IPINFO_TOKEN}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`IPInfo API error: ${response.status}`);
    }

    const data = await response.json();

    // Check if we got valid country data
    const countryCode = data?.country;
    const language = countryCode === 'UA' ? 'uk' : 'en';

    res.cookies.set('lang', language, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    // Optional: Log for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.debug(
        `IP ${ip} -> Country: ${countryCode} -> Language: ${language}`
      );
    }
  } catch (error) {
    // Log error but don't throw - fallback to default language
    console.error('Failed to set language by IP:', error);

    // Set default language (English) on error
    res.cookies.set('lang', 'en', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }
}
