import Link from 'next/link';
import { redirect } from 'next/navigation';

import {
  FreeExplanationPresentation,
  PaidExplanationPresentation,
  WordExplanation,
} from '../src/entities/models/explanation';
import { explain } from './actions';
import EmptyState from './components/EmptyState';
import ExplanationCard from './components/ExplanationCard';
import ExplanationForm from './components/ExplanationForm';
import Button from './components/ui/Button';
import Mascot from './components/ui/Mascot';
import ScrollToHere from './components/utils/ScrollToHere';
import { getLanguageCookie } from './i18n/actions';
import { translations } from './i18n/translations';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q: queryWord } = await searchParams;

  const lang = await getLanguageCookie();

  let result: FreeExplanationPresentation | PaidExplanationPresentation | null =
    null;
  let error;

  if (queryWord) {
    const { data, error: explainError } = await explain(queryWord, lang);
    result = data;
    error = explainError;
    // If error is the explanation limit error, redirect to settings
    if (error && error.includes('daily limit exceeded')) {
      redirect('/settings');
    }
  }

  const pageTranslations = translations[lang];

  return (
    <>
      <main className="w-full mx-auto p-4 md:p-8 flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col items-center gap-2 mt-2 mb-2">
          <Mascot />
          <h1 className="text-3xl md:text-4xl font-extrabold text-kidwise-blue text-center drop-shadow-sm tracking-tight bg-white rounded-2xl py-2 px-4">
            {pageTranslations.greeting}
          </h1>
          <p className="text-kidwise-text text-center text-base md:text-lg font-medium opacity-80 bg-white rounded-xl py-1 px-2">
            {pageTranslations.tagline}
          </p>
        </div>
        <ExplanationForm defaultValue={queryWord} />
        {!result && !error && !queryWord && (
          <EmptyState message={pageTranslations.emptyState} />
        )}
        {error && (
          <div className="text-kidwise-accent text-center font-semibold">
            {error}
          </div>
        )}
        <section id="result">
          {result ? <ScrollToHere id="result" /> : null}
          {result && (
            <ExplanationCard wordExplanation={result as WordExplanation}>
              <Link href="/">
                <Button
                  type="button"
                  className="mt-4 w-full bg-kidwise-blue text-white rounded-xl md:rounded-2xl p-3 md:p-4 font-bold hover:bg-kidwise-accent focus:bg-kidwise-accent transition text-base md:text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-kidwise-yellow/60 active:scale-95"
                >
                  {pageTranslations.tryAnother}
                </Button>
              </Link>
            </ExplanationCard>
          )}
        </section>
      </main>
    </>
  );
}
