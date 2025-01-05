import { Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity, UserRepository } from '@project/user';
import { ApiResponseMessage, Token, TokenPayload, User } from '@project/shared-types';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  public async verifyUser(dto: LoginUserDto): Promise<UserEntity | null> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(ApiResponseMessage.UserNotFound);
    }

    if (!await existUser.checkPassword(password)) {
      throw new UnauthorizedException(ApiResponseMessage.LoggedError);
    }

    return existUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      fullName: user.fullName
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } catch (error) {
      this.logger.error('[${ApiResponseMessage.TokenGenerationError}]: ' + error.message);
      throw new InternalServerErrorException(ApiResponseMessage.TokenGenerationError);
    }
  }
}
