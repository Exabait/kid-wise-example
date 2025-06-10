import Link from 'next/link';
import { Suspense } from 'react';

import { getLanguageCookie } from '../i18n/actions';
import UserHeaderMenu from './UserHeaderMenu';
import LanguageSelect from './utils/LanguageSelect';

export const dynamic = 'force-dynamic';

export default async function Header() {
  const lang = await getLanguageCookie();

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <Link href="/">
        <div className="text-lg font-bold">KidWise</div>
      </Link>
      <div className="flex items-center gap-3">
        <Suspense>
          <LanguageSelect lang={lang} />
        </Suspense>
        <UserHeaderMenu lang={lang} />
      </div>
    </header>
  );
}
