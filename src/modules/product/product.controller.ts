import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaClientKnownError } from '../../infrastructure/prisma/prismaErrors.enum';
import { PaginatedResult } from '../../shared/types/paginated-result.interface';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductResponse } from './dto/create-product.response';
import { DeleteProductResponse } from './dto/delete-product.response';
import { FindProductResponse } from './dto/find-product.response';
import { ListProductResponse } from './dto/list-product.response';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductResponse } from './dto/update-product.response';
import { ProductService } from './product.service';
import { ProductPoliciesGuard } from '../casl/product/guard/product-policies.guard';
import { GetUser } from '../../shared/decorator/get-user.decorator';
import { RequestUser } from '../../shared/types/request-user';
import { CheckPolicies } from '../casl/product/decorator/check-policies.decorator';
import { UpdatePolicy } from '../casl/product/policies/update.policy';
import { DeletePolicy } from '../casl/product/policies/delete.policy';

@Controller('product')
@ApiTags('Catalog')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: PaginatedResult<ListProductResponse>,
    description: 'List of the products returned by the query',
  })
  public async list(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    )
    queryProductDto: QueryProductDto,
  ): Promise<PaginatedResult<ListProductResponse>> {
    return this.productService.list(queryProductDto);
  }

  @Get(':productId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: FindProductResponse,
    description: 'Product searched',
  })
  @ApiNotFoundResponse({
    description: 'Product [$productId] could not be found.',
  })
  public async find(
    @Param('productId', ParseUUIDPipe) productId: string,
  ): Promise<FindProductResponse> {
    let product: FindProductResponse;

    try {
      product = await this.productService.find(productId);
    } catch (err) {
      const { code } = err as PrismaClientKnownRequestError;

      if (PrismaClientKnownError.NOT_FOUND === code) {
        throw new NotFoundException(
          `Product [${productId}] could not be found.`,
        );
      }
    }

    return product;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    type: CreateProductResponse,
    description: 'The product created',
  })
  @ApiBadRequestResponse({
    description: 'It happens when the fields are not properly set.',
  })
  @ApiForbiddenResponse({
    description: 'Must be logged in to create a product',
  })
  @ApiBearerAuth()
  public async create(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
    @GetUser() user: RequestUser,
  ): Promise<CreateProductResponse> {
    return this.productService.create(user.id, createProductDto);
  }

  @Put(':productId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, ProductPoliciesGuard)
  @ApiOkResponse({
    type: UpdateProductResponse,
    description: 'Updated product.',
  })
  @ApiForbiddenResponse({
    description: 'Only the owner can update the product',
  })
  @ApiBearerAuth()
  @CheckPolicies(UpdatePolicy)
  public async update(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ): Promise<UpdateProductResponse> {
    return this.productService.update(productId, updateProductDto);
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, ProductPoliciesGuard)
  @ApiOkResponse({
    type: DeleteProductResponse,
  })
  @ApiForbiddenResponse({
    description: 'Only the owner can delete the product',
  })
  @ApiBearerAuth()
  @CheckPolicies(DeletePolicy)
  public async delete(
    @Param('productId', ParseUUIDPipe) productId: string,
  ): Promise<DeleteProductResponse> {
    const isDeleted = await this.productService.delete(productId);

    return {
      isDeleted,
    };
  }
}
