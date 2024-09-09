import { Provider } from '@nestjs/common';
import { createProductUseCase } from '../../../../usecase/product/create-product/create-product.usecase';
import { ProductRepository } from '../../../repositories/product.repository';
import { UseCaseProxy } from '../../usecase.proxy';
import { CREATE_PRODUCT_USE_CASE_TOKEN } from './token';

export const CreateProductProxy: Provider = {
  inject: [ProductRepository],
  provide: CREATE_PRODUCT_USE_CASE_TOKEN,
  useFactory: (productRepository: ProductRepository) =>
    new UseCaseProxy(new createProductUseCase(productRepository)),
};
