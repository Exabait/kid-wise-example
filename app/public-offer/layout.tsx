import { ReactNode } from 'react';

import { getLanguageCookie } from '@/app/i18n/actions';

export default async function PublicOfferLayout({
  children,
  en,
  uk,
}: {
  children: ReactNode;
  en: ReactNode;
  uk: ReactNode;
}) {
  const lang = await getLanguageCookie();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {lang === 'uk' ? uk : en}
      {children}
    </div>
  );
}
