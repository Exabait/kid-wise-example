'use server';

import { ZodError } from 'zod';

import { getInjection } from '@/di/container';
import { Language } from '@/src/entities/Languages';
import { AppResponse } from '@/src/entities/common';
import { InputParseError, NotFoundError } from '@/src/entities/errors/common';
import {
  BadWordError,
  InvalidWordError,
} from '@/src/entities/errors/explanation';
import {
  FreeExplanationPresentation,
  PaidExplanationPresentation,
} from '@/src/entities/models/explanation';

import { translations } from './i18n/translations';

export async function explain(
  word: string,
  lang: Language
): Promise<
  AppResponse<FreeExplanationPresentation | PaidExplanationPresentation>
> {
  const instrumentationService = getInjection('INSTRUMENTATION_SERVICE');
  return await instrumentationService.startSpan(
    { name: 'explainWord' },
    async () => {
      try {
        const wordExplanationController = getInjection('EXPLAIN_CONTROLLER');

        const userController = getInjection('GET_USER_CONTROLLER');
        let user;
        try {
          user = await userController.getCurrentUser();
        } catch (error) {
          if (error instanceof NotFoundError) {
            user = null;
          } else {
            return { error: translations[lang].error, data: null };
          }
        }

        if (user) {
          const subscriptionController = getInjection(
            'SUBSCRIPTION_CONTROLLER'
          );
          const subscription =
            await subscriptionController.getUserSubscription();
          if (subscription.data) {
            const res =
              await wordExplanationController.explainWordForSubscriber(
                word.trim(),
                lang
              );
            return res;
          }
        }

        const res = await wordExplanationController.explainWord(
          word.trim(),
          lang
        );
        return res;
      } catch (error) {
        console.error('explain ' + word, error);
        const errorResponse: AppResponse<FreeExplanationPresentation> = {
          data: null,
          error: translations[lang].error,
        };

        if (error instanceof InputParseError) {
          if (error.message === 'More than one word') {
            errorResponse.error = translations[lang].wordErrors.moreThanOneWord;
          } else {
            const errorCode = (error.cause as ZodError).errors[0].code;

            const schemaErrorMessages: Record<string, string> = {
              too_small: translations[lang].wordErrors.required,
              invalid_string: translations[lang].wordErrors.regex,
            };
            errorResponse.error = schemaErrorMessages[errorCode];
          }
        }

        if (error instanceof InvalidWordError) {
          errorResponse.error = translations[lang].wordErrors.invalidWord;
        }

        if (error instanceof BadWordError) {
          errorResponse.error = translations[lang].wordErrors.badWord;
        }

        return errorResponse;
      }
    }
  );
}

export async function getUser() {
  const instrumentationService = getInjection('INSTRUMENTATION_SERVICE');
  return await instrumentationService.startSpan(
    { name: 'getUser' },
    async () => {
      try {
        const getUserController = getInjection('GET_USER_CONTROLLER');
        const user = await getUserController.getCurrentUser();
        return { data: user };
      } catch (error) {
        if (error instanceof NotFoundError) {
          return { data: null };
        }
        console.error('getUser action error: ', error);
        return { error: 'unhandledError', data: null };
      }
    }
  );
}
