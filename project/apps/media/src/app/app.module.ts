import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploaderModule } from '@project/file-uploader';
import { getMongooseOptions } from '@project/shared-helpers';
import { MediaConfigModule } from './media-config.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(
      getMongooseOptions('application.db')
    ),
    FileUploaderModule,
    MediaConfigModule,
  ],
    controllers: [],
  providers: [],
})
export class AppModule {}
