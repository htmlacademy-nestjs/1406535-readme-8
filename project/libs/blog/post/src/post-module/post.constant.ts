import { SortType, Status } from '@project/shared-types';

export const PostData = {
  CountLimit: 25,
  SortType: SortType.Published,
  Status: Status.Published,
} as const;
