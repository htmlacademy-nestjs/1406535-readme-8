import { ConflictException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity, UserRepository } from '@project/user';
import { ApiResponseMessage, Token, User } from '@project/shared-types';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { createJWTPayload } from '@project/shared-helpers';
import { JwtConfig } from '@project/shared-configurations';
import { UpdateUserPassRdo } from '../dto/update-user-pass.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(JwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof JwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async register(dto: CreateUserDto): Promise<UserEntity> {
    const { email, fullName, password, avatar } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(ApiResponseMessage.UserExist);
    }

    const user = { email, fullName, avatar, passwordHash: '' };
    const userEntity = await new UserEntity(user).setPassword(password);
    await this.userRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto): Promise<UserEntity> {
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

  public async getUserById(id: string): Promise<UserEntity> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(ApiResponseMessage.UserNotFound);
    }

    return existUser;
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(ApiResponseMessage.UserNotFound);
    }

    return existUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[${ApiResponseMessage.TokenGenerationError}]: ' + error.message);
      throw new InternalServerErrorException(ApiResponseMessage.TokenGenerationError);
    }
  }

  public async updateUserPassword(dto: UpdateUserPassRdo): Promise<UserEntity> {
    const existUser = await this.getUserById(dto.userId);
    if (! await existUser.checkPassword(dto.oldPassword)) {
      throw new InternalServerErrorException(ApiResponseMessage.LoggedError);
    }
    await existUser.setPassword(dto.newPassword);
    this.userRepository.update(existUser);

    return existUser;
  }
}
