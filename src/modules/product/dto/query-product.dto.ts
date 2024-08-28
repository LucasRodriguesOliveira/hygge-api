import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginatedFilter } from '../../../shared/filter/paginated.filter';
import { SortOption } from '../types/sort-option.enum';

export class QueryProductDto extends PaginatedFilter<SortOption> {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    type: String,
    description:
      "Search a product by it's name. (Starts With; Case Insensitive)",
    example: 'amazing',
    required: false,
  })
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    type: String,
    description:
      "Search a product by it's description. (Starts With; Case Insensitive)",
    example: 'a more descriptive',
    required: false,
  })
  description?: string;

  @Type(() => Number)
  @IsNumber({}, { message: "'page' attribute should be a number." })
  page: number;

  @Type(() => Number)
  @IsNumber({}, { message: "'pageSize' attribute should be a number." })
  pageSize: number;

  @IsEnum(SortOption)
  @IsNotEmpty({
    message: "'orderBy' attribute is mandatory",
  })
  @ApiProperty({
    type: SortOption,
    enum: SortOption,
    description: 'Defines which field should the results be sorted by',
    example: 'name',
    required: true,
    default: SortOption.NAME,
  })
  orderBy: SortOption;
}
