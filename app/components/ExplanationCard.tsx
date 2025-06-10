import Image from 'next/image';

import { WordExplanation } from '../../src/entities/models/explanation';
import { getLanguageCookie } from '../i18n/actions';
import { translations } from '../i18n/translations';
import { icons } from './ui/Icons';

export default async function ExplanationCard({
  wordExplanation,
  children,
}: {
  wordExplanation: WordExplanation;
  children: React.ReactNode;
}) {
  const lang = await getLanguageCookie();
  const t = translations[lang];

  return (
    <div className="w-full lg:max-w-xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col gap-4 md:gap-6 mt-2 shadow-lg border border-white/30 relative overflow-hidden animate-fade-in-up">
      {/* Sparkle/confetti effect */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 200 80" fill="none">
          <circle cx="30" cy="20" r="2" fill="#FFD97D" />
          <circle cx="60" cy="10" r="1.5" fill="#FFB7B2" />
          <circle cx="120" cy="30" r="2.5" fill="#A8E6CF" />
          <circle cx="180" cy="18" r="1.5" fill="#B5A7F7" />
          <circle cx="160" cy="60" r="2" fill="#FF8C42" />
          <circle cx="100" cy="70" r="1.5" fill="#6EC1E4" />
        </svg>
      </div>
      <div className="z-10">
        <span className="font-semibold text-kidwise-green flex items-center gap-1">
          {icons.explanation}
          {t.explanation || 'Explanation:'}
        </span>
        <div className="text-gray-800 mt-1 md:mt-2">
          {wordExplanation.explanation}
        </div>
      </div>
      <div className="border-t border-dashed border-kidwise-blue/20 my-2" />
      <div className="z-10">
        <span className="font-semibold text-kidwise-purple flex items-center gap-1">
          {icons.verse}
          {t.examples || 'Verses:'}
        </span>
        <div className="grid grid-cols-2 gap-10">
          {wordExplanation.examples.map((example, index) => (
            <div key={index} className="italic text-gray-800 mt-1 md:mt-2">
              {example.split('\n').map((line, lineIndex) => (
                <div key={lineIndex}>{line}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {wordExplanation.fact ? (
        <>
          <div className="border-t border-dashed border-kidwise-blue/20 my-2" />
          <div className="z-10">
            <span className="font-semibold text-kidwise-pink flex items-center gap-1">
              {icons.fact}
              {t.fact || 'Fact:'}
            </span>
            <div className="text-gray-800 mt-1 md:mt-2">
              {wordExplanation.fact}
            </div>
          </div>
        </>
      ) : null}
      <div className="border-t border-dashed border-kidwise-blue/20 my-2" />
      <div className="z-10">
        <span className="font-semibold text-kidwise-pink flex items-center gap-1">
          {icons.game}
          {t.gameIdea || 'Game Idea:'}
        </span>
        <div className="text-gray-800 mt-1 md:mt-2">
          {wordExplanation.gameIdea}
        </div>
      </div>
      {wordExplanation.imageUrl ? (
        <Image
          src={wordExplanation.imageUrl}
          alt="Explanation"
          width={200}
          height={200}
          className="mx-auto w-full"
        />
      ) : null}
      {children}
    </div>
  );
}
