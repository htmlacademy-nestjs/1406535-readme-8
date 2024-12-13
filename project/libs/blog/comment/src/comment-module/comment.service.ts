import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private blogService: PrismaClientService) {}

  create(dto: CreateCommentDto) {
    return this.blogService.comment.create({ data: dto });
  }

  findAll(postId: string) {
    return this.blogService.comment.findMany({ where: { postId } });
  }

  findOne(id: string) {
    return this.blogService.comment.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateCommentDto) {
    return this.blogService.comment.update({
      where: { id },
      data: dto,
    });
  }

  delete(id: string) {
    return this.blogService.comment.delete({ where: { id } });
  }
}
