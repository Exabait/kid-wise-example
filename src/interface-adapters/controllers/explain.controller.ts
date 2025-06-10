import { z } from 'zod';

import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { IGenerateExplanationImageUseCase } from '@/src/application/usecases/explanation/generate-explanation-image.use-case';
import { IUpdateWordExplanationUseCase } from '@/src/application/usecases/explanation/update-word-explanation.use-case';
import { IGetUserSubscriptionUseCase } from '@/src/application/usecases/subscription/get-user-subscription.use-case';
import { IGetUserUseCase } from '@/src/application/usecases/users/get-user.use-case';
import { AppResponse } from '@/src/entities/common';
import { AIResponseError } from '@/src/entities/errors/ai';
import { UnauthorizedError } from '@/src/entities/errors/auth';
import {
  DatabaseOperationError,
  InputParseError,
} from '@/src/entities/errors/common';
import {
  BadWordError,
  ExplanationNotFoundError,
  InvalidWordError,
} from '@/src/entities/errors/explanation';
import { SubscriptionNotFoundError } from '@/src/entities/errors/subscription';

import { IFindWordExplanationUseCase } from '../../application/usecases/explanation/find-word-explanation.use-case';
import { IGenerateWordExplanationUseCase } from '../../application/usecases/explanation/generate-word-explanation.use-case';
import { ISaveWordExplanationUseCase } from '../../application/usecases/explanation/save-word-explanation.use-case';
import { Language } from '../../entities/Languages';
import {
  FreeExplanationPresentation,
  PaidExplanationPresentation,
  WordExplanation,
} from '../../entities/models/explanation';

export type IExplainController = ReturnType<typeof ExplainController>;

const englishWordInputSchema = z.object({
  word: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z]+$/)
    .refine(val => !/\s/.test(val), {
      message: 'No spaces allowed, only one word',
    }),
});

const ukrainianWordInputSchema = z.object({
  word: z
    .string()
    .min(1)
    .regex(/^[а-щА-ЩьюяЬЮЯіїєґІЇЄҐ']+$/)
    .refine(val => !/\s/.test(val), {
      message: 'No spaces allowed, only one word',
    }),
});

const inputSchemas = {
  en: englishWordInputSchema,
  uk: ukrainianWordInputSchema,
};

function freeExplanationPresenter(
  response: WordExplanation
): FreeExplanationPresentation {
  return {
    word: response.word,
    explanation: response.explanation,
    examples: response.examples,
    gameIdea: response.gameIdea,
  };
}

function paidExplanationPresenter(
  response: WordExplanation
): PaidExplanationPresentation {
  return {
    word: response.word,
    explanation: response.explanation,
    examples: response.examples,
    gameIdea: response.gameIdea,
    fact: response.fact,
    imageUrl: response.imageUrl,
  };
}

export function ExplainController(
  instrumentationService: IInstrumentationService,
  findWordExplanationUseCase: IFindWordExplanationUseCase,
  generateWordExplanationUseCase: IGenerateWordExplanationUseCase,
  saveWordExplanationUseCase: ISaveWordExplanationUseCase,
  generateExplanationImageUseCase: IGenerateExplanationImageUseCase,
  updateWordExplanationUseCase: IUpdateWordExplanationUseCase,
  getUserUseCase: IGetUserUseCase,
  getUserSubscriptionUseCase: IGetUserSubscriptionUseCase
) {
  const createExplanation = async (word: string, language: Language) => {
    return await instrumentationService.startSpan(
      { name: 'createExplanation Controller Helper -> ' + word },
      async () => {
        const { data, error: inputParseError } = inputSchemas[
          language
        ].safeParse({ word });

        if (inputParseError) {
          console.log('inputParseError', inputParseError);
          const moreThanOneWord = inputParseError.errors.find(
            error => error.message === 'No spaces allowed, only one word'
          );
          if (moreThanOneWord) {
            throw new InputParseError('More than one word', {
              cause: inputParseError,
            });
          }
          throw new InputParseError('Invalid word', {
            cause: inputParseError,
          });
        }

        const validatedWord = data.word;

        // 1. return if exists in DB
        const found = await findWordExplanationUseCase.execute(
          validatedWord,
          language
        );
        if (found.data) return found;

        // 2. Generate with AI
        const generated = await generateWordExplanationUseCase.execute(
          validatedWord,
          language
        );

        if (generated.error) {
          if (generated.error === 'invalid_word') {
            throw new InvalidWordError(generated.error);
          }
          if (generated.error === 'bad_word') {
            throw new BadWordError(generated.error);
          }
        }

        if (!generated.data) {
          throw new AIResponseError('No data generated');
        }

        // 3. Save to DB
        const saved = await saveWordExplanationUseCase.execute(
          { ...generated.data, word: validatedWord },
          language
        );

        if (saved.error || !saved.data) {
          throw new DatabaseOperationError('Failed to save explanation');
        }

        return saved;
      }
    );
  };

  return {
    async explainWord(
      word: string,
      language: Language = 'en'
    ): Promise<AppResponse<FreeExplanationPresentation>> {
      return await instrumentationService.startSpan(
        { name: 'ExplainWord Controller -> ' + word },
        async () => {
          let saved;
          try {
            saved = await createExplanation(word, language);
          } catch (error) {
            console.error('createExplanation', error);
            throw error;
          }

          if (saved.error || !saved.data) {
            throw new ExplanationNotFoundError('Failed to create explanation');
          }

          return { data: freeExplanationPresenter(saved.data) };
        }
      );
    },
    async explainWordForSubscriber(
      word: string,
      language: Language = 'en'
    ): Promise<AppResponse<PaidExplanationPresentation>> {
      return await instrumentationService.startSpan(
        { name: 'ExplainWordForSubscriber Controller -> ' + word },
        async () => {
          let user;
          try {
            user = await getUserUseCase.execute();
          } catch (error) {
            throw error;
          }

          if (!user) {
            throw new UnauthorizedError('User not found.');
          }

          const subscription = await getUserSubscriptionUseCase.execute(
            user.id
          );

          if (!subscription) {
            throw new SubscriptionNotFoundError(
              'User does not have an active subscription.'
            );
          }

          const saved = await createExplanation(word, language);

          if (saved.error || !saved.data) {
            throw new ExplanationNotFoundError('Failed to create explanation');
          }

          if (saved.data.imageUrl) {
            return { data: paidExplanationPresenter(saved.data) };
          }

          const image = await generateExplanationImageUseCase.execute({
            id: saved.data.id,
            word: saved.data.word,
          });

          if (image.error || !image.data) {
            throw new AIResponseError('Failed to generate image');
          }

          const updated = await updateWordExplanationUseCase.execute(
            saved.data.id,
            { imageUrl: image.data },
            language
          );

          if (updated.error || !updated.success) {
            throw new DatabaseOperationError('Failed to update explanation');
          }

          return {
            data: paidExplanationPresenter({
              ...saved.data,
              imageUrl: image.data,
            }),
          };
        }
      );
    },
  };
}
