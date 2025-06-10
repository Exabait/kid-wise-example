import { getLanguageCookie } from '../i18n/actions';

interface PrivacyLayoutProps {
  en: React.ReactNode;
  uk: React.ReactNode;
  children: React.ReactNode;
}

export default async function PrivacyLayout({
  en,
  uk,
  children,
}: PrivacyLayoutProps) {
  const lang = await getLanguageCookie();

  return (
    <>
      {lang === 'uk' ? uk : en}
      {children}
    </>
  );
}
