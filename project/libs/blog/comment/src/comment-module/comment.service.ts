import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private blogService: PrismaClientService) {}

  public async create(dto: CreateCommentDto) {
    return this.blogService.comment.create({ data: dto });
  }

  public async findAll(postId: string) {
    await this.blogService.post.findUniqueOrThrow({ where: { id: postId } });
    return this.blogService.comment.findMany({ where: { postId } });
  }

  public async findOne(id: string) {
    return this.blogService.comment.findUnique({ where: { id } });
  }

  public async update(id: string, dto: UpdateCommentDto) {
    return this.blogService.comment.update({
      where: { id },
      data: dto,
    });
  }

  public async delete(id: string) {
    return this.blogService.comment.delete({ where: { id } });
  }
}
