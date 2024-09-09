import { Product } from '../../../domain/model/product';
import { IProductRepository } from '../../../domain/repository/product-repository.interface';
import { CreateProductDto } from './create-product.dto';

export class createProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  public async run(
    userId: string,
    productDto: CreateProductDto,
  ): Promise<Product> {
    const product = new Product({
      ...productDto,
      userId,
    });

    return this.productRepository.create(product);
  }
}
