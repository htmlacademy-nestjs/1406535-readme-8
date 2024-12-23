import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountConfigModule, getMongooseOptions } from '@project/account-config';
import { AuthenticationModule } from '@project/authentication';
import { UserModule } from '@project/user';
@Module({
  imports: [
    UserModule,
    AuthenticationModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
