import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './app.config';
import mongoConfig from './mongo/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // TODO: Передать список конфигураций для загрузки
      load: [applicationConfig, mongoConfig],
    }),
  ]
})
export class AccountConfigModule {}
