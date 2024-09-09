import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductResponse } from './dto/create-product.response';
import { FindProductResponse } from './dto/find-product.response';
import { ListProductResponse } from './dto/list-product.response';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductResponse } from './dto/update-product.response';
import { SortOption } from './types/sort-option.enum';
import { PaginatedService } from '../../shared/service/paginated.service';
import { PaginatedResult } from '../../shared/types/paginated-result.interface';
import { ListOwnedProducts } from './dto/list-owned-products.response';

@Injectable()
export class ProductService extends PaginatedService {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async list(
    queryProductDto: QueryProductDto,
  ): Promise<PaginatedResult<ListProductResponse>> {
    const where: any = {
      deletedAt: null,
      active: true,
      ...(queryProductDto?.name?.length
        ? {
            name: {
              startsWith: queryProductDto.name,
              mode: 'insensitive',
            },
          }
        : {}),
      ...(queryProductDto?.description?.length
        ? {
            description: {
              startsWith: queryProductDto.description,
              mode: 'insensitive',
            },
          }
        : {}),
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy: {
          ...(queryProductDto.orderBy === SortOption.DATE
            ? { createdAt: queryProductDto.sortOrder }
            : { [queryProductDto.orderBy]: queryProductDto.sortOrder }),
        },
        take: queryProductDto.pageSize,
        skip: (queryProductDto.page - 1) * queryProductDto.pageSize,
      }),
      this.prisma.product.count({ where }),
    ]);

    return this.paginated<ListProductResponse>(
      plainToInstance(ListProductResponse, products),
      {
        page: queryProductDto.page,
        total,
      },
    );
  }

  public async find(productId: string): Promise<FindProductResponse> {
    const product = await this.prisma.product.findFirstOrThrow({
      where: {
        id: productId,
        deletedAt: null,
        active: true,
      },
    });

    return plainToInstance(FindProductResponse, product);
  }

  public async create(
    userId: string,
    createProductDto: CreateProductDto,
  ): Promise<CreateProductResponse> {
    const product = await this.prisma.product.create({
      data: {
        ...createProductDto,
        userId,
      },
    });

    return plainToInstance(CreateProductResponse, product);
  }

  public async update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateProductResponse> {
    const product = await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: updateProductDto,
    });

    return plainToInstance(UpdateProductResponse, product);
  }

  public async delete(productId: string): Promise<boolean> {
    const product = await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return product.deletedAt !== null;
  }

  public async listByUser(userId: string): Promise<ListOwnedProducts[]> {
    const products = await this.prisma.product.findMany({
      where: {
        userId,
      },
    });

    return plainToInstance(ListOwnedProducts, products);
  }
}
