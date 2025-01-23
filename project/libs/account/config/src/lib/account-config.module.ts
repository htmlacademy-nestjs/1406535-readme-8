import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './jwt.config';
import rabbitConfig from './rabbit.config';
import { mongodbConfig } from '@project/shared-types';
import { applicationConfig } from '@project/shared-types';

const FILE_PATH = 'apps/account/account.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, mongodbConfig, jwtConfig, rabbitConfig],
      envFilePath: FILE_PATH,
    }),
  ]
})
export class AccountConfigModule {}
