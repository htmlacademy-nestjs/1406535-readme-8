import { Query, SortDirection } from '@project/shared-types';
import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { PostData } from './post.constant';

export class PostQuery implements Query {
  @Transform(({ value }) => +value || PostData.CountLimit)
  @IsNumber()
  @IsOptional()
  public limit: number = PostData.CountLimit;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: (typeof SortDirection)[keyof typeof SortDirection] = PostData.DefaultSort;

  @Transform(({ value }) => +value || PostData.DefaultPage)
  @IsOptional()
  public page: number = PostData.DefaultPage;
}
