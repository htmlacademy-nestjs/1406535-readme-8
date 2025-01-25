import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticationService } from '../authentication-module/authentication.service';
import { ApiResponseMessage, RefreshTokenPayload } from '@project/shared-types';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { JwtConfig } from '@project/shared-configurations';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(JwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof JwtConfig>,
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
