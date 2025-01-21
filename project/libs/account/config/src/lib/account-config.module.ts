import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import defaultJwtConfig from './lib/jwt.config';
import { dbConfig as defaultMongodbConfig } from '@project/shared-types';
import { applicationConfig as defaultApplicationConfig } from '@project/shared-types';

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
