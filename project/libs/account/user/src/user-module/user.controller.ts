import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRdo } from '../rdo/user.rdo';
import { UserService } from './user.service';
import { DetailUserRdo } from '../rdo/detail-user.rdo';
import { MongoIdValidationPipe } from '@project/shared-pipes';
import { ApiResponseMessage } from '@project/shared-types';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @ApiCreatedResponse({ type: UserRdo, description: ApiResponseMessage.UserCreated })
  @ApiConflictResponse({ description: ApiResponseMessage.UserExist })
  @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.register(dto);

    return newUser.toPOJO();
  }

  @ApiOkResponse({ type: DetailUserRdo, description: ApiResponseMessage.UserExist })
  @ApiNotFoundResponse( { description: ApiResponseMessage.UserNotFound })
  @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.userService.getById(id);
    return existUser.toPOJO();
  }
}
