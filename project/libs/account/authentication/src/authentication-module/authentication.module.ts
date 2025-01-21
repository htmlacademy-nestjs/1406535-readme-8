import { Module } from '@nestjs/common';
import { UserModule } from '@project/user';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/account-config';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { NotifyModule } from '@project/account-notify';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    NotifyModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy
  ],
})
export class AuthenticationModule {}
