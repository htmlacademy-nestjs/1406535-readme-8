import { SortDirection, SortType } from '@project/shared-types';

export const PostData = {
  CountLimit: 25,
  DefaultSort: SortDirection.Desc,
  SortType: SortType.Date,
  DefaultPage: 1,
} as const;
