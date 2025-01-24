import { Body, Controller, Get, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiResponse } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { ApiResponseMessage } from '@project/shared-types';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RequestWithUser } from './request-with-user.interface';
import { fillDto } from '@project/shared-helpers';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { MongoIdValidationPipe } from '@project/shared-pipes';
import { CreateUserDto } from '../dto/create-user.dto';
import { NotifyService } from '@project/account-notify';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService
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
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  // @ApiCreatedResponse({ type: UserRdo, description: ApiResponseMessage.UserCreated })
  // @ApiConflictResponse({ description: ApiResponseMessage.UserExist })
  // @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    await this.notifyService.registerSubscriber({ email: dto.email, fullName: dto.fullName });
    return newUser.toPOJO();
  }

  // @ApiOkResponse({ type: DetailUserRdo, description: ApiResponseMessage.UserExist })
  // @ApiNotFoundResponse( { description: ApiResponseMessage.UserNotFound })
  // @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUserById(id);
    return existUser.toPOJO();
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  // @HttpCode(HttpStatus.OK)
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Get a new access/refresh tokens'
  // })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }
}
