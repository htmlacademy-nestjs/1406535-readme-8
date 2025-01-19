
import 'multer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MediaConfig } from '@project/media-config';
import { join } from 'node:path';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { ApiResponseMessage } from '@project/shared-types';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);

  constructor(
    @Inject(MediaConfig.KEY)
    private readonly config: ConfigType<typeof MediaConfig>,
  ) {}

  private getUploadDirectoryPath(): string {
    return this.config.uploadDirectory;
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), filename)
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const destinationFile = this.getDestinationFilePath(file.originalname);

      await ensureDir(uploadDirectoryPath);
      await writeFile(destinationFile, file.buffer);

      return destinationFile;
    } catch (error) {
      this.logger.error('[${ApiResponseMessage.FileUploadError}]: ' + error.message);
      throw new Error(ApiResponseMessage.FileUploadError);
    }
  }
}
