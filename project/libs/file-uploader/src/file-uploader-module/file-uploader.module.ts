import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { FileModel, FileSchema } from './file.model';
import { FileUploaderService } from './file-uploader.service';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderRepository } from './file-uploader.repository';
import { FileUploaderFactory } from './file-uploader.factory';
@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return [{
          rootPath: configService.get<string>('media.uploadDirectory'),
          serveRoot: configService.get<string>('media.serveRoot')
        }]
      }
    }),
    MongooseModule.forFeature([
      { name: FileModel.name, schema: FileSchema }
    ])
  ],
  providers: [
    FileUploaderService,
    FileUploaderRepository,
    FileUploaderFactory,
  ],
  controllers: [FileUploaderController],
})
export class FileUploaderModule {}
