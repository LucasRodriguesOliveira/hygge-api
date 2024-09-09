import { HttpModule } from '@nestjs/axios';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '@prisma/client';
import { randomBytes } from 'crypto';
import * as request from 'supertest';
import { envConfig } from '../src/infrastructure/config/env/env.config';
import { PrismaModule } from '../src/infrastructure/prisma/prisma.module';
import { CreateProductDto } from '../src/modules/product/dto/create-product.dto';
import { CreateProductResponse } from '../src/modules/product/dto/create-product.response';
import { DeleteProductResponse } from '../src/modules/product/dto/delete-product.response';
import { ListProductResponse } from '../src/modules/product/dto/list-product.response';
import { QueryProductDto } from '../src/modules/product/dto/query-product.dto';
import { UpdateProductDto } from '../src/modules/product/dto/update-product.dto';
import { UpdateProductResponse } from '../src/modules/product/dto/update-product.response';
import { ProductModule } from '../src/modules/product/product.module';
import { SortOption } from '../src/modules/product/types/sort-option.enum';
import { PaginatedResult } from '../src/shared/types/paginated-result.interface';
import { SortOrder } from '../src/shared/types/sort-order.enum';
import { createProduct } from './helper/product/create-product';
import { listProduct } from './helper/product/list-product';
import { removeProduct } from './helper/product/remove-product';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  const basePath = '/product';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(envConfig),
        PrismaModule,
        HttpModule,
        ProductModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/ (GET)', () => {
    const queryProductDto: QueryProductDto = {
      orderBy: SortOption.DATE,
      sortOrder: SortOrder.ASC,
      page: 1,
      pageSize: 5,
    };

    let product: CreateProductResponse;

    beforeEach(async () => {
      product = await createProduct(app);
    });

    afterEach(async () => {
      const isDeleted = await removeProduct(app, product.id);

      if (!isDeleted) {
        throw 'Could not remove the product';
      }
    });

    it('should return a list of products, with at least one', () => {
      return request(app.getHttpServer())
        .get(basePath)
        .query(queryProductDto)
        .expect(HttpStatus.OK)
        .expect(({ body }) => {
          const { count, page, results, total } =
            body as PaginatedResult<ListProductResponse>;

          expect(count).toBeGreaterThanOrEqual(1);
          expect(total).toBeGreaterThanOrEqual(1);
          expect(page).toBe(queryProductDto.page);
          expect(results).toBeInstanceOf(Array);

          const itemIndex = results.findIndex((item) => item.id === product.id);

          expect(itemIndex).toBeGreaterThanOrEqual(0);
        });
    });
  });

  describe('/ (POST)', () => {
    const namePrefix = 'UNIT-TEST';
    const createProductDto: CreateProductDto = {
      name: `${namePrefix}/${randomBytes(5).toString('hex')}`,
      description: randomBytes(5).toString('hex'),
      price: parseFloat((Math.random() * 100).toFixed(2)),
    };

    const product: Product = null;

    afterAll(async () => {
      let productsToRemove: Product[] = [];
      if (product === null) {
        productsToRemove = await listProduct(app, namePrefix);
      } else {
        productsToRemove.push(product);
      }

      await Promise.all(
        productsToRemove.map((product) => removeProduct(app, product.id)),
      );
    });

    it('should create a product', () => {
      return request(app.getHttpServer())
        .post(basePath)
        .send(createProductDto)
        .expect(HttpStatus.CREATED)
        .expect(({ body }) => {
          const { id, createdAt } = body as CreateProductResponse;

          expect(id).not.toBeNull();
          expect(createdAt).not.toBeNull();
        });
    });
  });

  describe('/:productId (PUT)', () => {
    let product: CreateProductResponse;

    const updateProductDto: UpdateProductDto = {
      name: randomBytes(5).toString('hex'),
    };

    beforeEach(async () => {
      product = await createProduct(app);
    });

    afterEach(async () => {
      await removeProduct(app, product.id);
    });

    it('should update a product name by id', () => {
      return request(app.getHttpServer())
        .put(`${basePath}/${product.id}`)
        .send(updateProductDto)
        .expect(HttpStatus.OK)
        .expect(({ body }) => {
          const { id, name, updatedAt, createdAt } =
            body as UpdateProductResponse;

          expect(id).toBe(product.id);
          expect(name).not.toBe(product.name);
          expect(name).toBe(updateProductDto.name);
          expect(updatedAt).not.toBe(createdAt);
        });
    });
  });

  describe('/:productId (DELETE)', () => {
    let product: CreateProductResponse;

    const expectedResult: DeleteProductResponse = {
      isDeleted: true,
    };

    beforeEach(async () => {
      product = await createProduct(app);
    });

    afterEach(async () => {
      await removeProduct(app, product.id);
    });

    it('should delete a product by id', () => {
      return request(app.getHttpServer())
        .delete(`${basePath}/${product.id}`)
        .expect(HttpStatus.OK)
        .expect(({ body }) => {
          expect(body).toStrictEqual(expectedResult);
        });
    });
  });
});
