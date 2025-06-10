import { Language } from '../../entities/Languages';
import { AppActionResponse, AppResponse } from '../../entities/common';
import {
  PhraseExplanation,
  WordExplanation,
} from '../../entities/models/explanation';

export interface IExplanationRepository {
  findByWord(
    word: string,
    language: Language
  ): Promise<AppResponse<WordExplanation>>;
  save(
    explanation: WordExplanation,
    language: Language
  ): Promise<AppResponse<WordExplanation>>;
  updateWord(
    id: number,
    updates: Partial<WordExplanation>,
    language: Language
  ): Promise<AppActionResponse>;
}
