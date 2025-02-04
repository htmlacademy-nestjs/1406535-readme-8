import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post, Req, UseFilters } from '@nestjs/common';
import { CreateUserDto, DetailUserRdo, LoggedUserRdo, LoginUserDto, TokenPairRdo, UserRdo } from '@project/authentication';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiResponseMessage, ApplicationServiceURL } from '@project/shared-types';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { MongoIdValidationPipe } from '@project/shared-pipes';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiOkResponse({ type: LoggedUserRdo, description: ApiResponseMessage.LoggedSuccess })
  @ApiUnauthorizedResponse( { description: ApiResponseMessage.LoggedError })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @ApiOkResponse({ type: TokenPairRdo, description: ApiResponseMessage.UpdateTokerPair })
  @ApiUnauthorizedResponse( { description: ApiResponseMessage.TokenNotFound })
  @ApiBearerAuth('refreshToken')
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @ApiCreatedResponse({ type: UserRdo, description: ApiResponseMessage.UserCreated })
  @ApiForbiddenResponse({ description: ApiResponseMessage.UnauthorizedOnly })
  @ApiConflictResponse({ description: ApiResponseMessage.UserExist })
  @ApiBadRequestResponse()
  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, createUserDto);

    return data;
  }

  @ApiOkResponse({ type: DetailUserRdo, description: ApiResponseMessage.UserExist })
  @ApiNotFoundResponse({ description: ApiResponseMessage.UserNotFound })
  @ApiBadRequestResponse({ description: ApiResponseMessage.InvalidID })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`);

    return data;
  }
}
