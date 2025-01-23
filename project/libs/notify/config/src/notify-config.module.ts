import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import notifyConfig from './notify.config';
import { mongodbConfig } from '@project/shared-types';
import { applicationConfig } from '@project/shared-types';

const FILE_PATH = 'apps/notify/notify.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, mongodbConfig, notifyConfig],
      envFilePath: FILE_PATH
    }),
  ]
})
export class NotifyConfigModule {}
