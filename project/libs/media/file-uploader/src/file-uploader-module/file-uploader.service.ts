
import 'multer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MediaConfig } from '@project/media-config';
import { join } from 'node:path';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { ApiResponseMessage } from '@project/shared-types';
import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';
import { extension } from 'mime-types';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);

  constructor(
    @Inject(MediaConfig.KEY)
    private readonly config: ConfigType<typeof MediaConfig>,
  ) {}

  private getUploadDirectoryPath(): string {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    return join(this.config.uploadDirectory, year, month);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), filename);
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const fileName = randomUUID();
      const fileExtension = extension(file.mimetype);

      const destinationFile = this.getDestinationFilePath(`${fileName}.${fileExtension}`);

      await ensureDir(uploadDirectoryPath);
      await writeFile(destinationFile, file.buffer);

      return destinationFile;
    } catch (error) {
      this.logger.error('[${ApiResponseMessage.FileUploadError}]: ' + error.message);
      throw new Error(ApiResponseMessage.FileUploadError);
    }
  }
}
