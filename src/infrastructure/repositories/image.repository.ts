import { SupabaseClient } from '@supabase/supabase-js';

import { IImageRepository } from '@/src/application/repositories/image.repository.interface';
import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { ISupabaseService } from '@/src/application/services/supabase.service.interface';
import { AppResponse } from '@/src/entities/common';

export class ImageRepository implements IImageRepository {
  private supabaseClient: SupabaseClient;
  private defaultBucket = 'images';

  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly supabaseService: ISupabaseService
  ) {
    this.supabaseClient = this.supabaseService.getClientWithServiceRole();
  }

  async uploadImage(
    buffer: Buffer,
    fileName: string,
    bucket: string = this.defaultBucket
  ): Promise<AppResponse<string>> {
    return await this.instrumentationService.startSpan(
      { name: 'ImageRepository.uploadImage' },
      async () => {
        const { data, error } = await this.supabaseClient.storage
          .from(bucket)
          .upload(fileName, buffer, {
            contentType: 'image/png',
            upsert: true,
          });

        if (error) {
          return {
            data: null,
            error: `Failed to upload image: ${error.message}`,
          };
        }

        // Get the public URL
        const { data: signedUrlData } = await this.supabaseClient.storage
          .from(bucket)
          .createSignedUrl(fileName, 60 * 60 * 24 * 30);
        if (!signedUrlData?.signedUrl) {
          return { data: null, error: 'Failed to get public image URL' };
        }
        return { data: signedUrlData.signedUrl };
      }
    );
  }
}
