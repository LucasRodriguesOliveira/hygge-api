import { PaginatedResult } from '../types/paginated-result.interface';

interface PaginatedMetadata {
  total: number;
  page: number;
}

export class PaginatedService {
  protected paginated<T>(
    results: T[],
    { page, total }: PaginatedMetadata,
  ): PaginatedResult<T> {
    return {
      results,
      count: results.length,
      page,
      total,
    };
  }
}
