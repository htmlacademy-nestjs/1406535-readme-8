import { PostTypes } from '@project/shared-types';
import { Expose, Transform } from 'class-transformer';

export class PostRdo {
  @Expose()
  public userId: string;

  @Expose()
  public type: (typeof PostTypes)[keyof typeof PostTypes];

  @Expose()
  public tags: string[];

  @Expose()
  @Transform(({ value }) => value.length || null)
  public comments: number;

  @Expose()
  @Transform(({ value }) => value.length || null)
  public likes: number;

  @Expose()
  public createdAt: Date;

  @Expose()
  @Transform(({ value }) => JSON.parse(value))
  public content: unknown;

  @Expose()
  public published: boolean;
}
