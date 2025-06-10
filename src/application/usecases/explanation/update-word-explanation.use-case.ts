import { AppActionResponse } from '@/src/entities/common';

import { Language } from '../../../entities/Languages';
import { WordExplanation } from '../../../entities/models/explanation';
import { IExplanationRepository } from '../../repositories/explanation.repository.interface';
import { IInstrumentationService } from '../../services/instrumentation.service.interface';

export type IUpdateWordExplanationUseCase = ReturnType<
  typeof UpdateWordExplanationUseCase
>;

export function UpdateWordExplanationUseCase(
  instrumentationService: IInstrumentationService,
  repository: IExplanationRepository
) {
  return {
    async execute(
      id: number,
      explanation: Partial<WordExplanation>,
      language: Language
    ): Promise<AppActionResponse> {
      return await instrumentationService.startSpan(
        { name: 'UpdateWordExplanationUseCase' },
        async () => {
          const result = await repository.updateWord(id, explanation, language);

          if (result.error || !result.success) {
            return { success: false, error: 'Failed to update explanation' };
          }

          return result;
        }
      );
    },
  };
}
