import { ApiProperty } from '@nestjs/swagger';
import { PostTypes } from '@project/shared-types';
import { Expose, Transform } from 'class-transformer';

export class PostRdo {
  @ApiProperty({
    description: 'Post ID',
    example: '4e8a6ef4-2e28-46f6-ae5b-1d69b5dc1752'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Author ID',
    example: '676428b948541ea480d114fb',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'One of post type: video, text, link, quota, photo',
    example: 'VIDEO'
  })
  @Expose()
  public type: (typeof PostTypes)[keyof typeof PostTypes];

  @Expose()
  @Transform(({ value }) => value?.map((item) => item.name as string))
  public tags: string[];

  @ApiProperty({
    description: 'Post comments count',
    example: 15
  })
  @Expose()
  @Transform(({ value }) => value?.length || 0)
  public comments: number;

  @ApiProperty({
    description: 'Post likes count',
    example: 500
  })
  @Expose()
  @Transform(({ value }) => value?.length || 0)
  public likes: number;

  @ApiProperty({
    description: 'Published date',
    example: '2024-12-19T12:23:50'
  })
  @Expose()
  public updatedAt: Date;

  @ApiProperty({
    description: 'Created date',
    example: '2024-12-19T12:23:50'
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Content object (depends on post.type)',
    example: 'videoTitle: Funny cats, videoUrl: https://www.youtube.com/watch?v=F6va6tg62qg'
  })
  @Expose()
  @Transform(({ value }) => JSON.parse(value))
  public content: unknown;

  @ApiProperty({
    description: 'Published (true) or draft (false) flag',
    example: true
  })
  @Expose()
  public published: boolean;
}
