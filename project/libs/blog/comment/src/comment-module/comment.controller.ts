import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { fillDto } from '@project/shared-helpers';
import { CommentRdo } from '../rdo/comment.rdo';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiResponseMessage } from '@project/shared-types';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CommentWithPaginationRdo } from '../rdo/comment-with-pagination.rdo';
import { CommentQuery } from './comment.query';

@Controller('comments')
@ApiTags('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @ApiCreatedResponse({ type: CommentRdo, description: ApiResponseMessage.CommentCreated })
  @ApiNotFoundResponse({ description: ApiResponseMessage.PostNotFound })
  @ApiUnauthorizedResponse({ description: ApiResponseMessage.NonLogged })
  @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @Post('/')
  public async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.create(dto);
    return fillDto(CommentRdo, newComment);
  }

  @ApiOkResponse({ type: CommentWithPaginationRdo, description: ApiResponseMessage.CommentsFound })
  @ApiNotFoundResponse({ description: ApiResponseMessage.PostNotFound })
  @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @Get('/')
  public async index(@Query() query: CommentQuery) {
    const comments =  await this.commentService.findAll(query);
    return fillDto(CommentWithPaginationRdo, comments);
  }

  @ApiOkResponse({ type: CommentRdo, description: ApiResponseMessage.CommentFound })
  @ApiBadRequestResponse({ description: ApiResponseMessage.InvalidID })
  @ApiNotFoundResponse({ description: ApiResponseMessage.CommentNotFound })
  @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @Get(':id')
  public async show(@Param('id', ParseUUIDPipe) id: string) {
    const comment = await this.commentService.findById(id);
    return fillDto(CommentRdo, comment);
  }

  @ApiOkResponse({ type: CommentRdo, description: ApiResponseMessage.CommentUpdated })
  @ApiBadRequestResponse({ description: ApiResponseMessage.InvalidID })
  @ApiNotFoundResponse({ description: ApiResponseMessage.CommentNotFound })
  @ApiUnauthorizedResponse({ description: ApiResponseMessage.NonLogged })
  @ApiForbiddenResponse({ description: ApiResponseMessage.Forbidden })
  @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @Patch(':id')
  public async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCommentDto) {
    const comment = await this.commentService.update(id, dto);
    return fillDto(CommentRdo, comment);
  }

  @ApiNoContentResponse({ description: ApiResponseMessage.CommentDeleted })
  @ApiBadRequestResponse({ description: ApiResponseMessage.InvalidID })
  @ApiUnauthorizedResponse({ description: ApiResponseMessage.NonLogged })
  @ApiForbiddenResponse({ description: ApiResponseMessage.Forbidden })
  @ApiInternalServerErrorResponse({ description: ApiResponseMessage.ServerError })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id', ParseUUIDPipe) id: string) {
    await this.commentService.delete(id);
  }
}
