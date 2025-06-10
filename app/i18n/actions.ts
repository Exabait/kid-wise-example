'use server';

import { cookies } from 'next/headers';

import { Language } from '@/src/entities/Languages';

export async function setLanguageCookie(lang: Language) {
  const cookieStore = await cookies();
  cookieStore.set('lang', lang);
}

export async function getLanguageCookie() {
  const cookieStore = await cookies();
  return (cookieStore.get('lang')?.value || 'en') as Language;
}
