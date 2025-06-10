import { getLanguageCookie } from '../i18n/actions';

interface TermsLayoutProps {
  en: React.ReactNode;
  uk: React.ReactNode;
  children: React.ReactNode;
}

export default async function TermsLayout({
  en,
  uk,
  children,
}: TermsLayoutProps) {
  const lang = await getLanguageCookie();

  return (
    <>
      {lang === 'uk' ? uk : en}
      {children}
    </>
  );
}
