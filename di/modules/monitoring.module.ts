import { createModule } from '@evyweb/ioctopus';

import { DI_SYMBOLS } from '@/di/types';
import { InstrumentationService } from '@/src/infrastructure/services/instrumentation.service';

export function createMonitoringModule() {
  const module = createModule();

  module
    .bind(DI_SYMBOLS.INSTRUMENTATION_SERVICE)
    .toClass(InstrumentationService);

  return module;
}
