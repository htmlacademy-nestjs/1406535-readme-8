import { Query, SortDirection } from '@project/shared-types';
import { CommentData } from './comment.constant';
import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CommentQuery implements Query {
  @IsUUID()
  @IsOptional()
  public postId: string;

  @Transform(({ value }) => +value || CommentData.CountLimit)
  @IsNumber()
  @IsOptional()
  public limit: number = CommentData.CountLimit;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: (typeof SortDirection)[keyof typeof SortDirection] = CommentData.DefaultSort;

  @Transform(({ value }) => +value || CommentData.DefaultPage)
  @IsOptional()
  public page: number = CommentData.DefaultPage;
}
