import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({
    message: "'name' is mandatory.",
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
    example: 'Simple Product',
    description: 'Name of the product',
    required: true,
  })
  name: string;

  @IsString()
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
    example: 'My simple product',
    description: 'Description of the product',
    required: true,
  })
  description: string;

  @IsDefined({
    message: "'price' is mandatory.",
  })
  @IsNumber({}, { message: "'price' field mut be a number" })
  @ApiProperty({
    type: Number,
    example: 10.75,
    description: 'Price of the product',
    required: true,
  })
  price: number;
}
