import { SortDirection } from '@project/shared-types';

export const CommentData = {
  CountLimit: 50,
  DefaultSort: SortDirection.Desc,
  DefaultPage: 1,
} as const;
