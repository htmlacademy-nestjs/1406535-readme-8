import { EntityFactory, File } from '@project/shared-types';
import { FileUploaderEntity } from './file-uploader.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploaderFactory implements EntityFactory<FileUploaderEntity> {
  public create(entityPlainData: File): FileUploaderEntity {
    return new FileUploaderEntity(entityPlainData);
  }
}
