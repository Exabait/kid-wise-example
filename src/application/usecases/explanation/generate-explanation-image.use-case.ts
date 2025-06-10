import { IExplanationRepository } from '@/src/application/repositories/explanation.repository.interface';
import { IImageRepository } from '@/src/application/repositories/image.repository.interface';
import { AppResponse } from '@/src/entities/common';

import { IAIService } from '../../services/ai.service.interface';
import { IInstrumentationService } from '../../services/instrumentation.service.interface';

export type IGenerateExplanationImageUseCase = ReturnType<
  typeof GenerateExplanationImageUseCase
>;

type ExplanationForImage =
  | { id: number; word: string; phrase?: never }
  | { id: number; phrase: string; word?: never };

export function GenerateExplanationImageUseCase(
  instrumentationService: IInstrumentationService,
  openAIService: IAIService,
  imageRepository: IImageRepository,
  explanationRepository: IExplanationRepository
) {
  return {
    async execute(
      explanation: ExplanationForImage
    ): Promise<AppResponse<string>> {
      return await instrumentationService.startSpan(
        { name: 'GenerateExplanationImageUseCase' },
        async () => {
          let request = {
            id: explanation.id,
            value: explanation.word || explanation.phrase || '',
            type: explanation.word ? 'word' : 'phrase',
          };

          const result = await openAIService.generateImageFor(request.value);

          if (result.error || !result.data) {
            console.error('generateImageFor', result);
            return result;
          }

          const imageBuffer = Buffer.from(result.data, 'base64');

          const imageUrl = await imageRepository.uploadImage(
            imageBuffer,
            request.type + '/' + request.type + '_' + request.id
          );

          if (result.error || !imageUrl.data) {
            console.error('uploadImage', result);
            console.error('imageUrl', imageUrl);
            return { error: 'Failed to upload image', data: null };
          }

          const { error } = await explanationRepository.updateWord(
            request.id,
            { imageUrl: imageUrl.data },
            'en'
          );

          if (error) {
            console.log('error', error);
            return { error: 'Failed to update explanation', data: null };
          }

          return { data: imageUrl.data };
        }
      );
    },
  };
}
