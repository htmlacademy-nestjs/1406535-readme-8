import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig, RabbitConfig } from '@project/shared-configurations';

const APP_ENV = 'apps/blog/blog.env';
const NOTIFY_ENV = 'libs/notify/rabbit.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, RabbitConfig],
      envFilePath: [APP_ENV, NOTIFY_ENV],
    }),
  ]
})
export class BlogConfigModule {}
