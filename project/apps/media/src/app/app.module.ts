import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/shared-helpers';
import { MediaConfigModule } from './media-config.module';
import { FileUploaderModule } from '@project/file-uploader';

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
