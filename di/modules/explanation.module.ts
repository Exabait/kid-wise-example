import { createModule } from '@evyweb/ioctopus';

import { DI_SYMBOLS } from '@/di/types';
import { FindWordExplanationUseCase } from '@/src/application/usecases/explanation/find-word-explanation.use-case';
import { GenerateExplanationImageUseCase } from '@/src/application/usecases/explanation/generate-explanation-image.use-case';
import { GenerateWordExplanationUseCase } from '@/src/application/usecases/explanation/generate-word-explanation.use-case';
import { SaveWordExplanationUseCase } from '@/src/application/usecases/explanation/save-word-explanation.use-case';
import { UpdateWordExplanationUseCase } from '@/src/application/usecases/explanation/update-word-explanation.use-case';
import { ExplanationRepository } from '@/src/infrastructure/repositories/explanation.repository';
import { ImageRepository } from '@/src/infrastructure/repositories/image.repository';
import { ExplainController } from '@/src/interface-adapters/controllers/explain.controller';

export function createExplanationModule() {
  const module = createModule();

  // Repository
  module
    .bind(DI_SYMBOLS.EXPLANATION_REPOSITORY)
    .toClass(ExplanationRepository, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.SUPABASE_SERVICE,
    ]);
  module
    .bind(DI_SYMBOLS.IMAGE_REPOSITORY)
    .toClass(ImageRepository, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.SUPABASE_SERVICE,
    ]);

  // Use Cases
  module
    .bind(DI_SYMBOLS.FIND_WORD_EXPLANATION_USE_CASE)
    .toHigherOrderFunction(FindWordExplanationUseCase, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.EXPLANATION_REPOSITORY,
    ]);
  module
    .bind(DI_SYMBOLS.GENERATE_WORD_EXPLANATION_USE_CASE)
    .toHigherOrderFunction(GenerateWordExplanationUseCase, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.AI_SERVICE,
    ]);
  module
    .bind(DI_SYMBOLS.SAVE_WORD_EXPLANATION_USE_CASE)
    .toHigherOrderFunction(SaveWordExplanationUseCase, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.EXPLANATION_REPOSITORY,
    ]);
  module
    .bind(DI_SYMBOLS.UPDATE_WORD_EXPLANATION_USE_CASE)
    .toHigherOrderFunction(UpdateWordExplanationUseCase, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.EXPLANATION_REPOSITORY,
    ]);
  module
    .bind(DI_SYMBOLS.GENERATE_EXPLANATION_IMAGE_USE_CASE)
    .toHigherOrderFunction(GenerateExplanationImageUseCase, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.AI_SERVICE,
      DI_SYMBOLS.IMAGE_REPOSITORY,
      DI_SYMBOLS.EXPLANATION_REPOSITORY,
    ]);
  // Controller
  module
    .bind(DI_SYMBOLS.EXPLAIN_CONTROLLER)
    .toHigherOrderFunction(ExplainController, [
      DI_SYMBOLS.INSTRUMENTATION_SERVICE,
      DI_SYMBOLS.FIND_WORD_EXPLANATION_USE_CASE,
      DI_SYMBOLS.GENERATE_WORD_EXPLANATION_USE_CASE,
      DI_SYMBOLS.SAVE_WORD_EXPLANATION_USE_CASE,
      DI_SYMBOLS.GENERATE_EXPLANATION_IMAGE_USE_CASE,
      DI_SYMBOLS.UPDATE_WORD_EXPLANATION_USE_CASE,
      DI_SYMBOLS.GET_USER_USE_CASE,
      DI_SYMBOLS.GET_USER_SUBSCRIPTION_USE_CASE,
    ]);

  return module;
}
