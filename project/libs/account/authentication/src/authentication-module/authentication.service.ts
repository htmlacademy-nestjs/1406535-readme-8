import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity, UserRepository } from '@project/user';
import { AccountInfo } from '@project/shared-types';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async verifyUser(dto: LoginUserDto): Promise<UserEntity | null> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AccountInfo.UserNotFound);
    }

    if (!await existUser.checkPassword(password)) {
      throw new UnauthorizedException(AccountInfo.LoggedError);
    }

    return existUser;
  }
}
