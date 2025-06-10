import { AppResponse } from '@/src/entities/common';
import { DatabaseOperationError } from '@/src/entities/errors/common';

import { Language } from '../../../entities/Languages';
import { WordExplanation } from '../../../entities/models/explanation';
import { IExplanationRepository } from '../../repositories/explanation.repository.interface';
import { IInstrumentationService } from '../../services/instrumentation.service.interface';

export type ISaveWordExplanationUseCase = ReturnType<
  typeof SaveWordExplanationUseCase
>;

export function SaveWordExplanationUseCase(
  instrumentationService: IInstrumentationService,
  repository: IExplanationRepository
) {
  return {
    async execute(
      explanation: Omit<WordExplanation, 'id' | 'createdAt' | 'imageUrl'>,
      language: Language
    ): Promise<AppResponse<WordExplanation>> {
      return await instrumentationService.startSpan(
        { name: 'SaveWordExplanationUseCase' },
        async () => {
          // The repository should handle id/createdAt assignment (e.g., via DB defaults)
          const saved = await repository.save(
            explanation as WordExplanation,
            language
          );
          if (saved.error || !saved.data) {
            return { error: 'Failed to save explanation', data: null };
          }

          return saved;
        }
      );
    },
  };
}
