import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { plainToInstance } from 'class-transformer';
import { randomBytes, randomUUID } from 'crypto';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { PaginatedResult } from '../../shared/types/paginated-result.interface';
import { SortOrder } from '../../shared/types/sort-order.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductResponse } from './dto/create-product.response';
import { FindProductResponse } from './dto/find-product.response';
import { ListProductResponse } from './dto/list-product.response';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductResponse } from './dto/update-product.response';
import { ProductService } from './product.service';
import { SortOption } from './types/sort-option.enum';

describe('ProductService', () => {
  let productService: ProductService;
  const prismaServiceMock = {
    product: {
      findMany: jest.fn(),
      count: jest.fn(),
      findFirstOrThrow: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    productService = app.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('List', () => {
    const queryProductDto: QueryProductDto = {
      orderBy: SortOption.NAME,
      sortOrder: SortOrder.ASC,
      page: 1,
      pageSize: 10,
    };

    const productList: Product[] = [
      {
        id: randomUUID(),
        name: randomBytes(5).toString('hex'),
        description: randomBytes(10).toString('hex'),
        price: new Decimal(parseFloat((Math.random() * 100).toFixed(2))),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];

    const paginatedResult: PaginatedResult<ListProductResponse> = {
      count: 1,
      page: 1,
      total: 1,
      results: plainToInstance(ListProductResponse, productList),
    };

    beforeEach(() => {
      prismaServiceMock.product.findMany.mockResolvedValueOnce(productList);
      prismaServiceMock.product.count.mockResolvedValueOnce(productList.length);
    });

    describe('order by name asc', () => {
      beforeEach(() => {
        queryProductDto.orderBy = SortOption.NAME;
        queryProductDto.name = productList[0].name.substring(0, 1);
      });

      it('should return a list of products', async () => {
        const result = await productService.list(queryProductDto);

        expect(result).toStrictEqual(paginatedResult);
      });
    });

    describe('order by description asc', () => {
      beforeEach(() => {
        queryProductDto.orderBy = SortOption.DESCRIPTION;
        queryProductDto.description = productList[0].description.substring(
          0,
          1,
        );
      });

      it('should return a list of products', async () => {
        const result = await productService.list(queryProductDto);

        expect(result).toStrictEqual(paginatedResult);
      });
    });

    describe('order by date desc', () => {
      beforeEach(() => {
        queryProductDto.orderBy = SortOption.DATE;
        queryProductDto.sortOrder = SortOrder.DESC;
      });

      it('should return a list of products', async () => {
        const result = await productService.list(queryProductDto);

        expect(result).toStrictEqual(paginatedResult);
      });
    });
  });

  describe('Find', () => {
    describe('success', () => {
      const product: Product = {
        id: randomUUID(),
        name: randomBytes(5).toString('hex'),
        description: randomBytes(5).toString('hex'),
        price: new Decimal(parseFloat((Math.random() * 100).toFixed(2))),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const findProductResponse: FindProductResponse = plainToInstance(
        FindProductResponse,
        product,
      );

      beforeEach(() => {
        prismaServiceMock.product.findFirstOrThrow.mockResolvedValueOnce(
          product,
        );
      });

      it('should return a product by id', async () => {
        const result = await productService.find(product.id);

        expect(result).toStrictEqual(findProductResponse);
      });
    });
  });

  describe('create', () => {
    const product: Product = {
      id: randomUUID(),
      name: randomBytes(5).toString('hex'),
      description: randomBytes(5).toString('hex'),
      price: new Decimal(parseFloat((Math.random() * 100).toFixed(2))),
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const createProductDto: CreateProductDto = {
      name: product.name,
      description: product.description,
      price: product.price.toNumber(),
    };

    const createProductResponse: CreateProductResponse = plainToInstance(
      CreateProductResponse,
      product,
    );

    beforeEach(() => {
      prismaServiceMock.product.create.mockResolvedValueOnce(product);
    });

    it('should create a product and return it', async () => {
      const result = await productService.create(createProductDto);

      expect(result).toStrictEqual(createProductResponse);
    });
  });

  describe('update', () => {
    const product: Product = {
      id: randomUUID(),
      name: randomBytes(5).toString('hex'),
      description: randomBytes(5).toString('hex'),
      price: new Decimal(parseFloat((Math.random() * 100).toFixed(2))),
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const updateProductDto: UpdateProductDto = {
      price: product.price.toNumber(),
    };

    const updateProductResponse: UpdateProductResponse = plainToInstance(
      UpdateProductResponse,
      product,
    );

    beforeEach(() => {
      prismaServiceMock.product.update.mockResolvedValueOnce(product);
    });

    it('should update a product by Id', async () => {
      const result = await productService.update(product.id, updateProductDto);

      expect(result).toStrictEqual(updateProductResponse);
    });
  });

  describe('delete', () => {
    const product: Product = {
      id: randomUUID(),
      name: randomBytes(5).toString('hex'),
      description: randomBytes(5).toString('hex'),
      price: new Decimal(parseFloat((Math.random() * 100).toFixed(2))),
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    beforeEach(() => {
      product.deletedAt = new Date();
      prismaServiceMock.product.update.mockResolvedValueOnce(product);
    });

    it("should add a date value to the 'deletedAt' field and return a boolean value if it was successfull", async () => {
      const result = await productService.delete(product.id);

      expect(result).toBe(true);
    });
  });
});
