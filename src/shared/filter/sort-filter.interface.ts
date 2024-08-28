import { SortOrder } from '../types/sort-order.enum';

export interface SortFilter<SortOption> {
  orderBy: SortOption;
  sortOrder: SortOrder;
}
