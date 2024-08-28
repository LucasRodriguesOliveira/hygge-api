import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { SortOrder } from '../types/sort-order.enum';
import { SortFilter } from './sort-filter.interface';

export abstract class GenericFilter<SortOption>
  implements SortFilter<SortOption>
{
  abstract orderBy: SortOption;

  @IsEnum(SortOrder)
  @IsNotEmpty({
    message: "'sortOrder' attribute is mandatory.",
  })
  @IsOptional()
  @ApiProperty({
    type: SortOrder,
    enum: SortOrder,
    description: 'Defines the order (ASC/DESC)',
    example: 'desc',
    required: true,
    default: SortOrder.ASC,
  })
  sortOrder: SortOrder;
}
