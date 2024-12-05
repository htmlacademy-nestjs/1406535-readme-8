import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity, UserRepository } from '@project/user';
import { AuthenticationMessage, UserServiceMessage } from './authentication.constant';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async registerUser(dto: CreateUserDto): Promise<UserEntity | null> {
    const { email, fullName, password, avatar } = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(UserServiceMessage.UserExist);
    }

    const user = { email, fullName, avatar, passwordHash: '' };
    const userEntity = await new UserEntity(user).setPassword(password);
    this.userRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto): Promise<UserEntity | null> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(UserServiceMessage.UserNotFound);
    }

    if (!await existUser.checkPassword(password)) {
      throw new UnauthorizedException(AuthenticationMessage.LoggedError);
    }

    return existUser;
  }

  public async getUserById(id: string): Promise<UserEntity | null> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(UserServiceMessage.UserNotFound);
    }

    return existUser;
  }
}
