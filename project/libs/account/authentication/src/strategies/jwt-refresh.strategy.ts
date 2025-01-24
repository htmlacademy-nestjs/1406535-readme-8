import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConfig } from '@project/account-config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticationService } from '../authentication-module/authentication.service';
import { ApiResponseMessage, RefreshTokenPayload, TokenPayload } from '@project/shared-types';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthenticationService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    if (!await this.refreshTokenService.isExists(payload.tokenId)) {
      throw new UnauthorizedException(`${ApiResponseMessage.TokenNotFound}. ID: ${payload.tokenId}`);
    }

    await this.refreshTokenService.deleteRefreshSession(payload.tokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();

    return this.authService.getUserByEmail(payload.email);
  }
}
