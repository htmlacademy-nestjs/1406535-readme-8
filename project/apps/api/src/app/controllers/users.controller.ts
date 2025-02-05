import 'multer';
import { HttpService } from '@nestjs/axios';
import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto, DetailUserRdo, LoggedUserRdo, LoginUserDto, TokenPairRdo, UpdateUserPassRdo, UserRdo } from '@project/authentication';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { ApiResponseMessage, ApplicationServiceURL } from '@project/shared-types';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiConsumes, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { MongoIdValidationPipe } from '@project/shared-pipes';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/shared-interceptors';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('register')
  public async register(
    @Body() dto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      })
    ) avatar?: Express.Multer.File) {
      if (avatar) {
        const formData = new FormData();

        formData.append('file', new Blob([avatar.buffer], { type: avatar.mimetype }),
          avatar.originalname);

        const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload`, formData);

        dto.avatar = data.id;
      }

      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, dto);

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

  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('update')
  public async update(@Body() dto: UpdateUserPassRdo) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/update`, dto);
    return data;
  }
}
