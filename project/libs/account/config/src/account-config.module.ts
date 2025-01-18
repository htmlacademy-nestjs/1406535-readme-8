import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import defaultApplicationConfig from './lib/app.config';
import defaultMongodbConfig from './lib/mongo.config';
import defaultJwtConfig from './lib/jwt.config';

const FILE_PATH = 'apps/account/account.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [defaultApplicationConfig, defaultMongodbConfig, defaultJwtConfig],
      envFilePath: FILE_PATH,
    }),
  ]
})
export class AccountConfigModule {}
