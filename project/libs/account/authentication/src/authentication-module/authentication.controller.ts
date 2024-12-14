import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AccountInfo } from '@project/shared-types';
import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AccountInfo.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AccountInfo.LoggedError,
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authenticationService.verifyUser(dto);
    return verifiedUser.toPOJO();
  }

  // @Get('login')
  // public async login(@Body() dto: LoginUserDto) {
  //   const verifiedUser = await this.authenticationService.verifyUser(dto);
  //   return verifiedUser.toPOJO();
  // }

  // @Post('update')
  // public async update() {}
}
