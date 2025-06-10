import { createModule } from '@evyweb/ioctopus';

import { AIService } from '../../src/infrastructure/services/ai/ai.service';
import { DI_SYMBOLS } from '../types';

export function createAIModule() {
  const module = createModule();

  module
    .bind(DI_SYMBOLS.AI_SERVICE)
    .toClass(AIService, [DI_SYMBOLS.INSTRUMENTATION_SERVICE]);

  return module;
}
