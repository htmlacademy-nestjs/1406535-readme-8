import { Expose, Type } from 'class-transformer';
import { PostRdo } from './post.rdo';
import { ApiProperty } from '@nestjs/swagger';

export class PostWithPaginationRdo {
  @ApiProperty({
    description: 'Posts array',
    example: 'Post1, Post2, ...'
  })
  @Expose()
  @Type(() => PostRdo)
  public entities: PostRdo[];

  @ApiProperty({
    description: 'Total pages',
    example: 4
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'Total posts',
    example: 200
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'Current page',
    example: 1
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'Posts per page',
    example: 50
  })
  @Expose()
  public itemsPerPage: number;
}
