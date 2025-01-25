import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from '@project/account-notify';
import { AuthenticationModule } from '@project/authentication';
import { getMongooseOptions } from '@project/shared-helpers';
import { UserModule } from '@project/user';
import { AccountConfigModule } from './account-config.module';
@Module({
  imports: [
    AccountConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions('db')
    ),
    UserModule,
    AuthenticationModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
