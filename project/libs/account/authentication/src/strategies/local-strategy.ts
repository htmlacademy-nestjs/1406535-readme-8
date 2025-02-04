import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication-module/authentication.service';
import { User } from '@project/shared-types';

const FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationService) {
    super({ usernameField: FIELD_NAME });
  }

  public async validate(email: string, password: string): Promise<User> {
    return this.authService.verifyUser({ email, password });
  }
}
