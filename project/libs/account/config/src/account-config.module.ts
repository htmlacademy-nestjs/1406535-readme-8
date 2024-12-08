import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
<<<<<<< HEAD
import applicationConfig from './app.config';
import mongoConfig from './mongo/mongo.config';
=======
import defaultApplicationConfig from './lib/app.config';
import defaultMongodbConfig from './lib/mongo.config';
>>>>>>> 8310ab1 (сделала конфиги для app и mongo, использую валидацию joi)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
<<<<<<< HEAD
      // TODO: Передать список конфигураций для загрузки
      load: [applicationConfig, mongoConfig],
=======
      load: [defaultApplicationConfig, defaultMongodbConfig],
      envFilePath: 'apps/account/account.env',
>>>>>>> 8310ab1 (сделала конфиги для app и mongo, использую валидацию joi)
    }),
  ]
})
export class AccountConfigModule {}
