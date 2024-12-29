import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiResponse } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { ApiResponseMessage } from '@project/shared-types';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: ApiResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ApiResponseMessage.LoggedError,
  })
  @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
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
