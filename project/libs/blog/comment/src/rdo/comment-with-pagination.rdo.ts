import { Expose } from 'class-transformer';
import { CommentRdo } from './comment.rdo';
import { ApiProperty } from '@nestjs/swagger';

export class CommentWithPaginationRdo {
  @ApiProperty({
    description: 'Comments array',
    example: 'Comment1, Comment2, ...'
  })
  @Expose()
  public entities: CommentRdo[];

  @ApiProperty({
    description: 'Total pages',
    example: 4
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'Total comments',
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
    description: 'Comments per page',
    example: 50
  })
  @Expose()
  public itemsPerPage: number;
}
