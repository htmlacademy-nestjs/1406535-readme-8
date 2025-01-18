import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Comment } from '@project/shared-types';

export class CommentRdo implements Comment {
  @ApiProperty({
    description: 'Comment ID',
    example: '4e8a6ef4-2e28-46f6-ae5b-1d69b5dc1752'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: '10-300 chars comment text',
    example: 'May be you are right about it. But I\'am think that you\'re terrible wrong!'
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Post ID',
    example: '4e8a6ef4-2e28-46f6-ae5b-1d69b5dc1752'
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Author ID',
    example: '4e8a6ef4-2e28-46f6-ae5b-1d69b5dc1752'
  })
  @Expose()
  public authorId: string;

  @ApiProperty({
    description: 'Published date',
    example: '2024-12-19T12:23:50'
  })
  @Expose()
  public createdAt: Date;
}
