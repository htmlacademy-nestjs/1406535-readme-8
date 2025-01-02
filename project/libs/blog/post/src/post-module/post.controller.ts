import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/shared-helpers';
import { PostRdo } from '../rdo/post.rdo';
import { PostService } from './post.service';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  // @Post('/')
  // public async create(@Body() dto: CreateCommentDto) {
  //   const newComment = await this.commentService.create(dto);
  //   return fillDto(CommentRdo, newComment);
  // }

  @Get('/')
  public async index() {
    const posts =  await this.postService.findAll();
    return fillDto(PostRdo, posts);
  }

  // @Get(':id')
  // public async show(@Param('id', ParseUUIDPipe) id: string) {
  //   const comment = await this.commentService.findById(id);
  //   return fillDto(CommentRdo, comment);
  // }

  // @Patch(':id')
  // public async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCommentDto) {
  //   const comment = await this.commentService.update(id, dto);
  //   return fillDto(CommentRdo, comment);
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // public async destroy(@Param('id', ParseUUIDPipe) id: string) {
  //   await this.commentService.delete(id);
  // }
}
