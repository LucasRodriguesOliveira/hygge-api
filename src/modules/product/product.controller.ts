import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async list(): Promise<Product[]> {
    return this.productService.list();
  }

  @Get(':productId')
  @HttpCode(HttpStatus.OK)
  public async find(
    @Param('productId', ParseUUIDPipe) productId: string,
  ): Promise<Product> {
    return this.productService.find(productId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Put(':productId')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(productId, updateProductDto);
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.OK)
  public async delete(
    @Param('productId', ParseUUIDPipe) productId: string,
  ): Promise<Product> {
    return this.productService.delete(productId);
  }
}
