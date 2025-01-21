import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import notifyConfig from './notify.config';

const FILE_PATH = 'apps/notify/notify.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notifyConfig],
      envFilePath: FILE_PATH
    }),
  ]
})
export class NotifyConfigModule {}
