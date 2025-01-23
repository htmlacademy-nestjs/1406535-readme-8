import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { PaginationQuery } from '@project/shared-types';
import { CommentData } from './comment.constant';

export class CommentQuery extends PaginationQuery {
  @IsUUID()
  @IsOptional()
  public postId: string;

  @Transform(({ value }) => +value || CommentData.CountLimit)
  @IsNumber()
  @IsOptional()
  public limit: number = CommentData.CountLimit;
}
