import { Module } from '@nestjs/common';
import { FileUploaderModule } from '@project/file-uploader';
import { MediaConfigModule } from '@project/media-config';

@Module({
  imports: [FileUploaderModule, MediaConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
