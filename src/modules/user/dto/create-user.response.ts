import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { randomUUID } from 'crypto';

export class CreateUserResponse implements User {
  @ApiProperty({
    type: String,
    description: "User's Identification",
    example: randomUUID(),
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    description: "User's name",
    example: 'John Doe',
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    description: "User's e-mail",
    example: 'johndoe@email.com',
  })
  @Expose()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({
    type: Boolean,
    description: 'Defines if the user is active.',
    example: true,
  })
  @Expose()
  active: boolean;

  @ApiProperty({
    type: Date,
    description: 'When the user was created',
    example: new Date(),
  })
  @Expose()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date;
}
