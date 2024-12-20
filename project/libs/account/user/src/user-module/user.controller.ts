import { Controller, HttpStatus, Post, Body, Get, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AccountInfo } from '@project/shared-types';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRdo } from '../rdo/user.rdo';
import { UserService } from './user.service';
import { DetailUserRdo } from '../rdo/detail-user.rdo';
import { MongoIdValidationPipe } from '@project/shared-pipes';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: AccountInfo.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AccountInfo.UserExist,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.register(dto);

    return newUser.toPOJO();
  }

  @ApiResponse({
    type: DetailUserRdo,
    status: HttpStatus.OK,
    description: AccountInfo.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AccountInfo.UserNotFound,
  })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.userService.getById(id);
    return existUser.toPOJO();
  }
}
