import { Injectable } from '@nestjs/common';
import { UserRepository } from '@project/user';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}
}
