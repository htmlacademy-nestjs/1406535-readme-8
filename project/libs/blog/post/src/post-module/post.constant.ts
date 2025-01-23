import { SortType, Status } from '@project/shared-types';

export const PostData = {
  CountLimit: 25,
  SortType: SortType.Date,
  Status: Status.Published,
} as const;
