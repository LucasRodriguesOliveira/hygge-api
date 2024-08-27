import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  public async list(): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  public async find(productId: string): Promise<Product> {
    return this.prisma.product.findFirst({
      where: {
        id: productId,
        deletedAt: null,
      },
    });
  }

  public async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  public async update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: updateProductDto,
    });
  }

  public async delete(productId: string): Promise<Product> {
    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
