import { AppResponse } from '@/src/entities/common';
import { Explanation } from '@/src/entities/models/explanation';

export type GenerateExplanationError = 'invalid_request' | 'bad_request';
export type GenerateExplanationResponse = AppResponse<
  Omit<Explanation, 'id' | 'createdAt' | 'imageUrl'>,
  GenerateExplanationError | string
>;

export interface IAIService {
  generateWordExplanation(
    word: string,
    language: 'en' | 'uk'
  ): Promise<GenerateExplanationResponse>;
  generateImageFor(input: string): Promise<AppResponse<string>>;
}
