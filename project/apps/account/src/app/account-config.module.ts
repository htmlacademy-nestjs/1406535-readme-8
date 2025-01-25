import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig, JwtConfig, MongoConfig, RabbitConfig } from '@project/shared-configurations';

const APP_ENV = 'apps/account/account.env';
const RABBIT_ENV = 'libs/notify/rabbit.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, MongoConfig, JwtConfig, RabbitConfig],
      envFilePath: [APP_ENV, RABBIT_ENV],
    }),
  ]
})
export class AccountConfigModule {}
