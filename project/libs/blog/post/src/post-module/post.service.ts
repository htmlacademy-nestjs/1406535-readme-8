import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';
import { ApiResponseMessage, Comment, PaginationResult, Post } from '@project/shared-types';
import { Prisma } from '@prisma/client';
import { PostQuery } from './post.query';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private blogService: PrismaClientService) {}

  // private async сountAll(where: Prisma.CommentWhereInput): Promise<number> {
  //   return this.blogService.comment.count({ where });
  // }

  // private calculatePages(totalCount: number, limit: number): number {
  //   return Math.ceil(totalCount / limit);
  // }

  // private async verifyPostById(id: string): Promise<void> {
  //   try {
  //     await this.blogService.post.findUnique({ where: { id } });
  //   } catch {
  //     throw new NotFoundException(ApiResponseMessage.PostNotFound);
  //   }
  // }

  // public async create(dto: CreatePostDto): Promise<Post> {
  //   await this.verifyPostById(dto.postId);

  //   try {
  //     const newComment = await this.blogService.comment.create({ data: dto });
  //     return newComment;
  //   } catch {
  //     throw new InternalServerErrorException(ApiResponseMessage.ServerError);
  //   }
  // }

  public async findAll() {
    return this.blogService.post.findMany();
  }

  // public async findAll(query?: PostQuery): Promise<PaginationResult<Post>> {
  //   const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
  //   const take = query?.limit;
  //   const where: Prisma.CommentWhereInput = {};
  //   const orderBy: Prisma.CommentOrderByWithRelationInput = {};

  //   if (query?.postId) {
  //     await this.verifyPostById(query.postId);
  //     where.postId = query.postId;
  //   }

  //   if (query?.sortDirection) {
  //     orderBy.createdAt = query.sortDirection;
  //   }

  //   const [records, count] = await Promise.all([
  //     this.blogService.comment.findMany({ where, orderBy, skip, take }),
  //     this.сountAll(where),
  //   ]);

  //   if (count < query?.page) {
  //     throw new NotFoundException(ApiResponseMessage.CommentNotFound);
  //   }

  //   return {
  //     entities: records,
  //     totalPages: this.calculatePages(count, take),
  //     totalItems: count,
  //     currentPage: query?.page,
  //     itemsPerPage: take,
  //   }
  // }

  // public async findById(id: string): Promise<Comment> {
  //   try {
  //     const existComment = await this.blogService.comment.findUnique({ where: { id } });
  //     return existComment;
  //   } catch {
  //     throw new NotFoundException(ApiResponseMessage.CommentNotFound);
  //   }
  // }

  // public async update(id: string, dto: UpdateCommentDto): Promise<Comment> {
  //   await this.findById(id);

  //   try {
  //     const updatedComment = await this.blogService.comment.update({
  //       where: { id },
  //       data: dto,
  //     });
  //     return updatedComment;
  //   } catch {
  //     throw new InternalServerErrorException(ApiResponseMessage.ServerError);
  //   }
  // }

  // public async delete(id: string): Promise<void> {
  //   try {
  //     await this.blogService.comment.delete({ where: { id } });
  //   } catch {
  //     throw new InternalServerErrorException(ApiResponseMessage.ServerError);
  //   }
  // }
}
