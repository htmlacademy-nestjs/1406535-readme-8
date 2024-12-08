import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import defaultApplicationConfig from './lib/app.config';
import defaultMongodbConfig from './lib/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [defaultApplicationConfig, defaultMongodbConfig],
      envFilePath: 'apps/account/account.env',
    }),
  ]
})
export class AccountConfigModule {}
