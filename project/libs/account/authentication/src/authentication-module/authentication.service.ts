import { ConflictException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity, UserRepository } from '@project/user';
import { ApiResponseMessage, Token, TokenPayload, User } from '@project/shared-types';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '@project/account-config';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) {}

  public async register(dto: CreateUserDto): Promise<UserEntity> {
    const { email, fullName, password, avatar } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(ApiResponseMessage.UserExist);
    }

    const user = { email, fullName, avatar, passwordHash: '' };
    const userEntity = await new UserEntity(user).setPassword(password);
    this.userRepository.save(userEntity);

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
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      fullName: user.fullName
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });
      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[${ApiResponseMessage.TokenGenerationError}]: ' + error.message);
      throw new InternalServerErrorException(ApiResponseMessage.TokenGenerationError);
    }
  }
}
