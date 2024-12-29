import { SortDirection } from './common.constant';

export interface Query {
  limit: number;
  sortDirection: (typeof SortDirection)[keyof typeof SortDirection];
  page: number;
}
