import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: "User's 'name' field.",
    example: '',
    required: true,
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty({
    message: "field 'name' is mandatory.",
  })
  name: string;

  @ApiProperty({
    type: String,
    description: "User's 'email' field.",
    example: '',
    required: true,
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsEmail({}, { message: "field 'email' must be a valid e-mail." })
  @IsNotEmpty({
    message: "field 'email' is mandatory.",
  })
  email: string;

  @ApiProperty({
    type: String,
    description: "User's 'password' field.",
    example: '',
    required: true,
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty({
    message: "field 'password' is mandatory.",
  })
  password: string;
}
