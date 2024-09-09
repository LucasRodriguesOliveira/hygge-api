import { plainToInstance } from 'class-transformer';
import { Product } from '../../domain/model/product';
import { IProductRepository } from '../../domain/repository/product-repository.interface';
import { PrismaService } from '../prisma/prisma.service';

export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(product: Product): Promise<Product> {
    const result = this.prisma.product.create({
      data: product,
    });

    return plainToInstance(Product, result);
  }

  findAll(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  update(id: number, name: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
