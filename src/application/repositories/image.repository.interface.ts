import { AppResponse } from '@/src/entities/common';

export interface IImageRepository {
  /**
   * Uploads an image buffer to Supabase storage and returns the public image URL.
   * @param buffer The image buffer
   * @param fileName The file name (should be unique)
   * @param bucket Optional: the storage bucket name (default: 'images')
   */
  uploadImage(
    buffer: Buffer,
    fileName: string,
    bucket?: string
  ): Promise<AppResponse<string>>;
}
