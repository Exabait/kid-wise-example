'use client';

import { LanguageIcon } from '@heroicons/react/24/solid';

import { useRouter } from 'next/navigation';

import { Language } from '@/src/entities/Languages';

import { setLanguageCookie } from '../../i18n/actions';
import { translations } from '../../i18n/translations';

export default function LanguageSelect({ lang }: { lang: Language }) {
  const router = useRouter();

  const onLanguageChange = async (selectedLang: Language) => {
    localStorage.setItem('kidwise_lang', selectedLang);
    await setLanguageCookie(selectedLang);
    // Use router.replace to force a server-side re-render with the new language
    router.replace(window.location.pathname + window.location.search);
  };

  return (
    <>
      <label htmlFor="lang-switch" className="sr-only">
        {translations[lang].language}
      </label>
      <LanguageIcon className="h-4 w-4" />
      <select
        id="lang-switch"
        className="rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={lang}
        onChange={e => onLanguageChange(e.target.value as Language)}
      >
        {Object.entries(translations).map(([code]) => (
          <option key={code} value={code}>
            {code === 'en' ? 'English' : 'Українська'}
          </option>
        ))}
      </select>
    </>
  );
}
