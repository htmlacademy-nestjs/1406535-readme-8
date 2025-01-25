import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common';
import { LoginUserDto } from '@project/authentication';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApplicationServiceURL } from '@project/shared-types';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

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
