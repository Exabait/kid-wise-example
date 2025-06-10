import { AppResponse } from '@/src/entities/common';

import { Language } from '../../../entities/Languages';
import { WordExplanation } from '../../../entities/models/explanation';
import { IExplanationRepository } from '../../repositories/explanation.repository.interface';
import { IInstrumentationService } from '../../services/instrumentation.service.interface';

export type IFindWordExplanationUseCase = ReturnType<
  typeof FindWordExplanationUseCase
>;

export function FindWordExplanationUseCase(
  instrumentationService: IInstrumentationService,
  repository: IExplanationRepository
) {
  return {
    async execute(
      word: string,
      language: Language
    ): Promise<AppResponse<WordExplanation>> {
      return await instrumentationService.startSpan(
        { name: 'FindWordExplanationUseCase' },
        async () => {
          return repository.findByWord(word, language);
        }
      );
    },
  };
}
