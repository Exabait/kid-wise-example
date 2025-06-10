import { createModule } from '@evyweb/ioctopus';

import { SupabaseService } from '@/src/infrastructure/services/supabase.service';

import { DI_SYMBOLS } from '../types';

export function createInfrastructureModule() {
  const module = createModule();

  module.bind(DI_SYMBOLS.SUPABASE_SERVICE).toClass(SupabaseService);

  return module;
}
