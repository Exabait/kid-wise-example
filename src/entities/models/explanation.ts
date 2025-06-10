export interface Explanation {
  id: number;
  explanation: string;
  examples: string[];
  gameIdea: string;
  fact: string | null;
  imageUrl: string | null;
  createdAt: Date;
}

export interface WordExplanation extends Explanation {
  word: string;
}

export interface PhraseExplanation extends Explanation {
  phrase: string;
}

export type FreeExplanationPresentation = Pick<
  WordExplanation,
  'word' | 'explanation' | 'examples' | 'gameIdea'
>;
export type PaidExplanationPresentation = Omit<
  WordExplanation,
  'id' | 'createdAt'
>;
