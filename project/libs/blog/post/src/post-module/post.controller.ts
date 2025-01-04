import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { fillDto } from '@project/shared-helpers';
import { PostRdo } from '../rdo/post.rdo';
import { PostService } from './post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { ApiResponseMessage } from '@project/shared-types';
import { PostWithPaginationRdo } from '../rdo/post-with-pagination.rdo';
import { PostQuery } from './post.query';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @ApiCreatedResponse({ type: PostRdo, description: ApiResponseMessage.PostCreated })
  @ApiNotFoundResponse({ description: ApiResponseMessage.PostNotFound })
  @ApiUnauthorizedResponse({ description: ApiResponseMessage.NonLogged })
  @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.postService.create(dto);
    return fillDto(PostRdo, newPost);
  }

  @ApiOkResponse({ type: PostWithPaginationRdo, description: ApiResponseMessage.PostFound })
  @ApiNotFoundResponse({ description: ApiResponseMessage.PostNotFound })
  @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @Get('/')
  public async index(@Query() query: PostQuery) {
    const posts =  await this.postService.findAll(query);
    return fillDto(PostWithPaginationRdo, posts);
  }

  @ApiOkResponse({ type: PostRdo, description: ApiResponseMessage.PostFound })
  @ApiBadRequestResponse({ description: ApiResponseMessage.InvalidID })
  @ApiNotFoundResponse({ description: ApiResponseMessage.PostNotFound })
  @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @Get(':id')
  public async show(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.postService.findById(id);
    return fillDto(PostRdo, post);
  }

  @ApiOkResponse({ type: PostRdo, description: ApiResponseMessage.PostUpdated })
  @ApiBadRequestResponse({ description: ApiResponseMessage.InvalidID })
  @ApiNotFoundResponse({ description: ApiResponseMessage.PostNotFound })
  @ApiUnauthorizedResponse({ description: ApiResponseMessage.NonLogged })
  @ApiForbiddenResponse({ description: ApiResponseMessage.Forbidden })
  @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @Patch(':id')
  public async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePostDto) {
    const post = await this.postService.update(id, dto);
    return fillDto(PostRdo, post);
  }

  @ApiNoContentResponse({ description: ApiResponseMessage.PostDeleted })
  @ApiBadRequestResponse({ description: ApiResponseMessage.InvalidID })
  @ApiUnauthorizedResponse({ description: ApiResponseMessage.NonLogged })
  @ApiForbiddenResponse({ description: ApiResponseMessage.Forbidden })
  @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id', ParseUUIDPipe) id: string) {
    await this.postService.delete(id);
  }
}
