import Mascot from './components/ui/Mascot';
import Spinner from './components/ui/Spinner';
import { getLanguageCookie } from './i18n/actions';
import { translations } from './i18n/translations';

export default async function Loading() {
  const language = await getLanguageCookie();
  const t = translations[language];

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <div>
        <div
          className="relative flex items-center justify-center"
          style={{ width: 64, height: 64 }}
        >
          <Spinner size={128} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -bottom-4">
            <Mascot />
          </div>
        </div>
      </div>
      <p className="bg-white bg-opacity-60 rounded-xl py-1 px-2 text-lg text-kidwise-orange font-bold mt-16 md:w-1/2 text-center">
        {t.explanationPageLoading}
      </p>
    </main>
  );
}
