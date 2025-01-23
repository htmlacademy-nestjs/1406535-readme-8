import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Query } from './query.interface';
import { Default, SortDirection } from './common.constant';

export class PaginationQuery implements Query {
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public limit: number;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: (typeof SortDirection)[keyof typeof SortDirection] = Default.SortDirection;

  @Transform(({ value }) => +value || Default.PageNumber )
  @IsOptional()
  public page: number = Default.PageNumber;
}
