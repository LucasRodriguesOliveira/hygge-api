import { INestApplication } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { CreateProductDto } from '../../../src/modules/product/dto/create-product.dto';
import { CreateProductResponse } from '../../../src/modules/product/dto/create-product.response';
import { ProductService } from '../../../src/modules/product/product.service';

export const createProduct = async (
  app: INestApplication,
  mock?: CreateProductDto,
): Promise<CreateProductResponse> => {
  const product: CreateProductDto = {
    name: `Test/${randomBytes(5).toString('hex')}`,
    description: `Test/${randomBytes(5).toString('hex')}`,
    price: parseFloat((Math.random() * 100).toFixed(2)),
    ...mock,
  };

  const productService = app.get<ProductService>(ProductService);
  const data = await productService.create(product);

  return data;
};
