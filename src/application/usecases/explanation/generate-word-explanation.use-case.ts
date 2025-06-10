import { GenerateExplanationResponse } from '../../services/ai.service.interface';
import { IAIService } from '../../services/ai.service.interface';
import { IInstrumentationService } from '../../services/instrumentation.service.interface';

export type IGenerateWordExplanationUseCase = ReturnType<
  typeof GenerateWordExplanationUseCase
>;

export function GenerateWordExplanationUseCase(
  instrumentationService: IInstrumentationService,
  openAIService: IAIService
) {
  return {
    async execute(
      word: string,
      language: 'en' | 'uk' = 'en'
    ): Promise<GenerateExplanationResponse> {
      return await instrumentationService.startSpan(
        { name: 'GenerateWordExplanationUseCase' },
        async () => {
          const explanation = await openAIService.generateWordExplanation(
            word,
            language
          );

          return explanation;
        }
      );
    },
  };
}
