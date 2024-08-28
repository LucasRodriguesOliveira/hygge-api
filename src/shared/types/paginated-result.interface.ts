import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResult<T> {
  @ApiProperty({
    type: Array<T>,
  })
  results: T[];

  @ApiProperty({
    type: Number,
  })
  count: number;

  @ApiProperty({
    type: Number,
  })
  total: number;

  @ApiProperty({
    type: Number,
  })
  page: number;
}
