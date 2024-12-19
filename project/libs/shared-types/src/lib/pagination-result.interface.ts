import { Entity } from './entity';

export interface PaginationResult<T extends Entity> {
  entities: T[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}
