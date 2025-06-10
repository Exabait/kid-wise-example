import { getLanguageCookie } from '../i18n/actions';
import { translations } from '../i18n/translations';
import Button from './ui/Button';
import Input from './ui/Input';

export default async function ExplanationForm({
  defaultValue,
}: {
  defaultValue: string;
}) {
  const lang = await getLanguageCookie();
  const pageTranslations = translations[lang];

  return (
    <form
      method="GET"
      action="/"
      className="flex flex-col gap-4 md:gap-6 bg-white/40 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-10 border border-white/30 w-full lg:max-w-xl mx-auto"
    >
      <label
        htmlFor="word-input"
        className="text-kidwise-blue font-semibold text-base md:text-lg mb-1"
      >
        {pageTranslations.inputLabel}
      </label>
      <Input
        id="word-input"
        type="text"
        name="q"
        defaultValue={defaultValue}
        placeholder={pageTranslations.inputPlaceholder}
        maxLength={32}
        autoFocus
        required
      />
      <Button
        type="submit"
        className="w-full bg-kidwise-accent text-white rounded-xl md:rounded-2xl p-4 md:p-5 font-bold hover:bg-kidwise-orange focus:bg-kidwise-orange transition text-lg md:text-xl shadow-md focus:outline-none focus:ring-2 focus:ring-kidwise-yellow/60 active:scale-95 disabled:opacity-60"
      >
        {pageTranslations.explainButton}
      </Button>
    </form>
  );
}
