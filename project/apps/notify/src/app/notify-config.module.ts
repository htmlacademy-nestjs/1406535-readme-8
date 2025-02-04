import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig, MailConfig, MongoConfig, RabbitConfig } from '@project/shared-configurations';

const APP_ENV = 'apps/notify/notify.env';
const RABBIT_ENV = 'apps/notify/rabbit.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, MongoConfig, MailConfig, RabbitConfig],
      envFilePath: [APP_ENV, RABBIT_ENV]
    }),
  ]
})
export class NotifyConfigModule {}
