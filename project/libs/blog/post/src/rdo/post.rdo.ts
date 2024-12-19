import { PostTypes } from '@project/shared-types';
import { Expose, Transform } from 'class-transformer';

export class PostRdo {
  @Expose()
  public userId: string;

  @Expose()
  public type: typeof PostTypes;

  @Expose()
  public tags: string[];

  @Expose()
  public createdAt: Date;

  @Expose()
  @Transform(({ value }) => JSON.parse(value))
  public content: unknown;
}
