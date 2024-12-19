import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { fillDto } from '@project/shared-helpers';
import { CommentRdo } from '../rdo/comment.rdo';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogInfo } from '@project/shared-types';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Controller('comments')
@ApiTags('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: BlogInfo.CommentCreated,
  })
  @Post('/')
  public async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.create(dto);
    return fillDto(CommentRdo, newComment);
  }

  @Get('/')
  public async showAll(@Body() dto: { postId: string }) {
    const comments = await this.commentService.findAll(dto.postId);
    return fillDto(CommentRdo, comments);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogInfo.CommentNotFound,
  })
  @Get(':id')
  public async show(@Param('id', ParseUUIDPipe) id: string) {
    const comment = await this.commentService.findOne(id);
    return fillDto(CommentRdo, comment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogInfo.CommentNotFound,
  })
  @Patch(':id')
  public async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCommentDto) {
    const comment = await this.commentService.update(id, dto);
    return fillDto(CommentRdo, comment);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogInfo.CommentNotFound,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.commentService.delete(id);
  }
}
