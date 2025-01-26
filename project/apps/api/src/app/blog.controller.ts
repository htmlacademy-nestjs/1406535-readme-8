import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor, RequestIdInterceptor } from '@project/shared-interceptors';
import { CreatePostDto } from '@project/blog-post';
import { ApplicationServiceURL } from '@project/shared-types';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RequestIdInterceptor, InjectUserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/`, dto);
    return data;
  }
}
