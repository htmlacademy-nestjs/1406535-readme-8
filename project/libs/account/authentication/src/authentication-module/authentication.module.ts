import { Module } from '@nestjs/common';
import { UserModule } from '@project/user';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { LocalStrategy } from '../strategies/local-strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token-module/refresh-token.module';
import { getJwtOptions } from '@project/shared-helpers';
import { NotifyModule } from '@project/notification';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    NotifyModule,
    RefreshTokenModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthenticationModule {}
