import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: "User's 'name'.",
    example: 'John Doe',
    required: false,
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty({
    message: "Field 'name' cannot be empty.",
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  name?: string;

  @ApiProperty({
    type: String,
    description: "User's 'email'.",
    example: 'johndoe@email.com',
    required: false,
  })
  @IsNotEmpty({
    message: "Field 'email' cannot be empty.",
  })
  @IsString()
  @IsOptional()
  @IsEmail()
  @MinLength(5)
  @MaxLength(100)
  email?: string;

  @ApiProperty({
    type: String,
    description: "User's 'password'.",
    example: 'john123',
    required: false,
  })
  @IsNotEmpty({
    message: "Field 'password' cannot be empty.",
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  password?: string;

  @ApiProperty({
    type: Boolean,
    description: "Define's if user is active or not.",
    example: true,
    required: false,
  })
  @IsNotEmpty({
    message: "Field 'active' cannot be empty.",
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
