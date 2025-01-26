import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req, UseFilters, UseInterceptors } from '@nestjs/common';
import { LoggedUserRdo, LoginUserDto, TokenPairRdo } from '@project/authentication';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiResponseMessage, ApplicationServiceURL } from '@project/shared-types';
import { RequestIdInterceptor } from '@project/shared-interceptors';
import { ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiOkResponse({ type: LoggedUserRdo, description: ApiResponseMessage.LoggedSuccess })
  @ApiUnauthorizedResponse( { description: ApiResponseMessage.LoggedError })
  @UseInterceptors(RequestIdInterceptor)
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @ApiOkResponse({ type: TokenPairRdo, description: ApiResponseMessage.UpdateTokerPair })
  @ApiUnauthorizedResponse( { description: ApiResponseMessage.TokenNotFound })
  @ApiBearerAuth('refreshToken')
  @UseInterceptors(RequestIdInterceptor)
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }
}
