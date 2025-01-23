import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mediaConfig from './media.config';

const FILE_PATH = 'apps/media/media.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [mediaConfig],
      envFilePath: FILE_PATH
    }),
  ]
})
export class MediaConfigModule {}
