import OpenAI from 'openai';

import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { AppResponse } from '@/src/entities/common';
import { AIResponseError } from '@/src/entities/errors/ai';
import { Explanation } from '@/src/entities/models/explanation';

import {
  GenerateExplanationResponse,
  IAIService,
} from '../../../application/services/ai.service.interface';
import { Language, Languages } from '../../../entities/Languages';
import { generateImagePrompt } from './prompts/generate-image-en.prompt';
import { promptsByLanguage } from './prompts/prompts';

export class AIService implements IAIService {
  private openai: OpenAI;

  private models = {
    free: 'gpt-4o-mini',
    paid: 'gpt-4o',
    image: 'dall-e-3',
  };

  private promptsByLanguage = promptsByLanguage;

  constructor(
    private readonly instrumentationService: IInstrumentationService
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateWordExplanation(
    word: string,
    language: Language
  ): Promise<GenerateExplanationResponse> {
    return await this.instrumentationService.startSpan(
      { name: 'AIService.generateWordExplanation' },
      async () => {
        try {
          const prompt = this.promptsByLanguage[language].explainWord(word);
          const response = await this.openai.chat.completions.create({
            model: this.models.free,
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            temperature: 0.7,
          });
          const explanation = JSON.parse(
            response.choices[0].message.content || '{}'
          ) as Omit<Explanation, 'id' | 'createdAt' | 'imageUrl'>;
          return { data: explanation };
        } catch (error) {
          throw new AIResponseError('Failed to generate word explanation', {
            cause: error,
          });
        }
      }
    );
  }

  async generateImageFor(input: string): Promise<AppResponse<string>> {
    return await this.instrumentationService.startSpan(
      { name: 'AIService.generateImage' },
      async () => {
        try {
          const prompt = generateImagePrompt(input);
          const response = await this.openai.images.generate({
            model: this.models.image,
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
          });

          const image = response.data?.[0]?.b64_json;

          if (!image) {
            console.error('generateImageFor result', JSON.stringify(response));
            return { data: null, error: 'No image data returned' };
          }

          return { data: image };
        } catch (error) {
          console.error('generateImageFor', error);
          return { data: null, error: 'Failed to generate image' };
        }
      }
    );
  }
}
