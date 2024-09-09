import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty({
    message: "Field 'name' is mandatory.",
  })
  @MaxLength(50, {
    message:
      "'name' is too long. Maximal length is $constraint1 characters, but actual is $value.",
  })
  @MinLength(3, {
    message:
      "'name' is too short. Minimal length is $constraint1 characters, but actual is $value.",
  })
  @ApiProperty({
    type: String,
    description: 'New name of the product',
    example: 'Amazing Product',
    required: false,
  })
  name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({
    message: "Field 'description' is mandatory.",
  })
  @MaxLength(150, {
    message:
      "'description' is too long. Maximal length is $constraint1 characters, but actual is $value.",
  })
  @MinLength(5, {
    message:
      "'description' is too short. Minimal length is $constraint1 characters, but actual is $value.",
  })
  @ApiProperty({
    type: String,
    description: 'New description of the product',
    example: 'A more descriptive information about the product',
    required: false,
  })
  description?: string;

  @IsDefined({
    message: "'price' is mandatory.",
  })
  @IsOptional()
  @IsNumber({}, { message: "'price' field mut be a number" })
  @ApiProperty({
    type: Number,
    example: 10.75,
    description: 'Price of the product',
    required: true,
  })
  price?: number;

  @IsDefined()
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: String,
    description: 'Defines if an item is active or not.',
    example: true,
    required: false,
  })
  active?: boolean;
}
