import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';
import { ApiResponseMessage, PaginationResult, Post, PostTypes } from '@project/shared-types';
import { Prisma } from '@prisma/client';
import { PostQuery } from './post.query';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private blogService: PrismaClientService) {}

  private joinContentToJson(dto: CreatePostDto | UpdatePostDto): string {
    switch(dto.type) {
      case PostTypes.Link:
        return JSON.stringify({ description: dto.linkDescription, url: dto.linkUrl });
      case PostTypes.Photo:
        return JSON.stringify({ url: dto.photoUrl });
      case PostTypes.Text:
        return JSON.stringify({ title: dto.textTitle, description: dto.textDescription, content: dto.textContent });
      case PostTypes.Quota:
        return JSON.stringify({ author: dto.quotaAuthor, text: dto.quotaText });
      case PostTypes.Video:
        return JSON.stringify({ title: dto.videoTitle, url: dto.videoUrl });
      default:
        throw new BadRequestException(ApiResponseMessage.BadData);
    }
  }

  private async сountAll(where: Prisma.PostWhereInput): Promise<number> {
    return this.blogService.post.count({ where });
  }

  private calculatePages(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async create(dto: CreatePostDto): Promise<Post> {
    const content = this.joinContentToJson(dto);

    try {
      const newPost = await this.blogService.post.create({
        data: { type: dto.type, userId: dto.userId, content }
      });
      return newPost;
    } catch {
      throw new InternalServerErrorException(ApiResponseMessage.ServerError);
    }
  }

  public async findAll(query?: PostQuery): Promise<PaginationResult<Post>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    if (query?.type) {
      where.type = query.type;
    }

    const [records, count] = await Promise.all([
      this.blogService.post.findMany({ where, orderBy, skip, take }),
      this.сountAll(where),
    ]);

    if (count < query?.page) {
      throw new NotFoundException(ApiResponseMessage.PostNotFound);
    }

    return {
      entities: records,
      totalPages: this.calculatePages(count, take),
      totalItems: count,
      currentPage: query?.page,
      itemsPerPage: take,
    }
  }

  public async findById(id: string): Promise<Post> {
    try {
      const existPost = await this.blogService.post.findUniqueOrThrow({
        where: { id },
        include: { comments: true, likes: true },
      });
      return existPost;
    } catch {
      throw new NotFoundException(ApiResponseMessage.PostNotFound);
    }
  }

  public async update(id: string, dto: UpdatePostDto): Promise<Post> {
    await this.findById(id);
    const content = this.joinContentToJson(dto);

    try {
      const updatedPost = await this.blogService.post.update({
        where: { id },
        data: { type: dto.type, userId: dto.userId, content },
      });
      return updatedPost;
    } catch {
      throw new InternalServerErrorException(ApiResponseMessage.ServerError);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.blogService.post.delete({ where: { id } });
    } catch {
      throw new InternalServerErrorException(ApiResponseMessage.ServerError);
    }
  }
}
