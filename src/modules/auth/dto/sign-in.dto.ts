import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    type: String,
    required: true,
    minLength: 5,
    maxLength: 100,
    example: 'johndoe@email.com',
    description: 'User e-mail to authenticate',
  })
  @IsString()
  @IsNotEmpty({ message: "'email' field is mandatory." })
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    example: 'john123',
    description: 'User password to authenticate',
  })
  @IsString()
  @IsNotEmpty({ message: "'password' field is mandatory." })
  password: string;
}
