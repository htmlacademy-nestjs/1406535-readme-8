import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploaderModule } from '@project/file-uploader';
import { MediaConfigModule } from '@project/media-config';
import { getMongooseOptions } from '@project/shared-helpers';

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
