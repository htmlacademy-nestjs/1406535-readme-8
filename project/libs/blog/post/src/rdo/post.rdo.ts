import { PostTypes } from '@project/shared-types';
import { Expose, Transform, Type } from 'class-transformer';
import { CommentRdo } from 'libs/blog/comment/src/rdo/comment.rdo';

export class PostRdo {
  @Expose()
  public userId: string;

  @Expose()
  public type: (typeof PostTypes)[keyof typeof PostTypes];

  @Expose()
  public tags: string[];

  @Expose()
  @Type(() => CommentRdo)
  public comments: Comment[];

  @Expose()
  public createdAt: Date;

  @Expose()
  @Transform(({ value }) => JSON.parse(value))
  public content: unknown;
}
