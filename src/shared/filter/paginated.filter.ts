import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
import { GenericFilter } from './generic.filter';

export abstract class PaginatedFilter<T> extends GenericFilter<T> {
  @IsNumber({}, { message: "'page' attribute should be a number." })
  @Min(1)
  @ApiProperty({
    type: Number,
    description: 'Specifies which page should return.',
    example: 2,
    required: true,
    minimum: 1,
    default: 1,
  })
  page: number;

  @IsNumber({}, { message: "'pageSize' attribute should be a number." })
  @Min(1)
  @ApiProperty({
    type: Number,
    description: 'Specifies how many results should return per page.',
    example: 10,
    required: true,
    minimum: 1,
    default: 10,
  })
  pageSize: number;
}
