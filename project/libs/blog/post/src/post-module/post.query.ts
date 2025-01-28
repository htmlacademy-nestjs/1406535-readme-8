import { PaginationQuery, PostTypes, SortType, Status } from '@project/shared-types';
import { Transform } from 'class-transformer';
import { IsIn, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { PostData } from './post.constant';

export class PostQuery extends PaginationQuery {
  @Transform(({ value }) => +value || PostData.CountLimit)
  @IsNumber()
  @IsOptional()
  public limit: number = PostData.CountLimit;

  @Transform(({ value }) => value.toUpperCase())
  @IsIn(Object.values(PostTypes))
  @IsOptional()
  public type: (typeof PostTypes)[keyof typeof PostTypes];

  @Transform(({ value }) => value.toLowerCase())
  @IsString()
  @IsOptional()
  public tag: string;

  @IsString()
  @IsOptional()
  public search: string;

  @IsMongoId()
  @IsOptional()
  public author: string;

  @IsIn(Object.values(Status))
  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  public status: (typeof Status)[keyof typeof Status] = Status.Published;

  @IsIn(Object.values(SortType))
  @IsOptional()
  sortType: (typeof SortType)[keyof typeof SortType] = SortType.Published;
}
