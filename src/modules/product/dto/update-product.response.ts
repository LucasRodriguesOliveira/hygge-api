import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude, Expose, Type } from 'class-transformer';
import { randomUUID } from 'crypto';

export class UpdateProductResponse implements Product {
  @ApiProperty({
    type: Boolean,
    description: 'Defines whether an item is active or not.',
    example: true,
  })
  @Expose()
  active: boolean;

  @ApiProperty({
    type: Date,
    description: 'Creation timestamp of the item.',
    example: new Date(),
  })
  @Expose()
  createdAt: Date;

  @Exclude()
  deletedAt: Date;

  @ApiProperty({
    type: String,
    description: 'Description of the item, provided by the user.',
    example: 'A very important Product for everyday usage.',
  })
  @Expose()
  description: string;

  @ApiProperty({
    type: String,
    description: 'Item unique identifier, auto generated.',
    example: randomUUID(),
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Name of the item, provided by the user.',
    example: 'Powerfull Product',
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Price of the item, provided by the user.',
    example: (Math.random() * 100).toFixed(2),
  })
  @Expose()
  @Type(() => Number)
  price: Decimal;

  @ApiProperty({
    type: Date,
    description: 'Update timestamp of the item.',
    example: new Date(),
  })
  @Expose()
  updatedAt: Date;

  @ApiProperty({
    type: String,
    description: "User's id owner of the product.",
    example: randomUUID(),
  })
  @Expose()
  userId: string;
}
