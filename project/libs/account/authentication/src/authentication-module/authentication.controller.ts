import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationMessage, UserServiceMessage } from './authentication.constant';
import { UserRdo } from '../rdo/user.rdo';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: UserServiceMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: UserServiceMessage.UserExist,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authenticationService.registerUser(dto);

    return newUser.toPOJO();
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessage.LoggedError,
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authenticationService.verifyUser(dto);
    return verifiedUser.toPOJO();
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: UserServiceMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UserServiceMessage.UserNotFound,
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authenticationService.getUserById(id);
    return existUser.toPOJO();
  }
}
