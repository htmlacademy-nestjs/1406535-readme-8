import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { ApiResponseMessage } from '@project/shared-types';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RequestWithUser } from './request-with-user.interface';
import { fillDto } from '@project/shared-helpers';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { MongoIdValidationPipe } from '@project/shared-pipes';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { RequestWithTokenPayload } from './request-with-token-payload.interface';
import { NotifyService } from '@project/notification';
import { UserRdo } from '../rdo/user.rdo';
import { DetailUserRdo } from '../rdo/detail-user.rdo';
import { UpdateUserPassRdo } from '../dto/update-user-pass.dto';
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,
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

  @ApiCreatedResponse({ type: UserRdo, description: ApiResponseMessage.UserCreated })
  @ApiConflictResponse({ description: ApiResponseMessage.UserExist })
  @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    await this.notifyService.registerSubscriber({ email: dto.email, fullName: dto.fullName });

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiOkResponse({ type: DetailUserRdo, description: ApiResponseMessage.UserExist })
  @ApiNotFoundResponse( { description: ApiResponseMessage.UserNotFound })
  @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUserById(id);

    return fillDto(DetailUserRdo, existUser.toPOJO());
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse( { description: ApiResponseMessage.UpdateTokerPair })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @Post('update')
  public async update(@Body() dto: UpdateUserPassRdo) {
    const updatedUser = await this.authService.updateUserPassword(dto);

    return fillDto(UserRdo, updatedUser.toPOJO());
  }
}
