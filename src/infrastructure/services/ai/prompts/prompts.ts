import { Language, Languages } from '@/src/entities/Languages';

import { explainPhrasePrompt } from './explain-phrase-en.prompt';
import { explainPhrasePromptUk } from './explain-phrase-uk.prompt';
import { explainEnglishWordPrompt } from './explain-word-en.prompt';
import { explainUkrainianWordPrompt } from './explain-word-uk.prompt';

type promptKey = 'explainWord' | 'explainPhrase';

export const promptsByLanguage: Record<
  Language,
  Record<promptKey, Function>
> = {
  [Languages.en]: {
    explainWord: explainEnglishWordPrompt,
    explainPhrase: explainPhrasePrompt,
  },
  [Languages.uk]: {
    explainWord: explainUkrainianWordPrompt,
    explainPhrase: explainPhrasePromptUk,
  },
};
