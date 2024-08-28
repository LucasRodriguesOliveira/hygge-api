import { ApiProperty } from '@nestjs/swagger';

export class DeleteProductResponse {
  @ApiProperty({
    type: Boolean,
    description: 'Defines if the product has been successfully deleted.',
    example: true,
  })
  isDeleted: boolean;
}
