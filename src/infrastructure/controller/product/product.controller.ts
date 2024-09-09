import {
  Body,
  Controller,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Product } from '../../../domain/model/product';
import { createProductUseCase } from '../../../usecase/product/create-product/create-product.usecase';
import { UseCaseProxy } from '../../useCaseProxy/usecase.proxy';
import { UseCase } from '../../useCaseProxy/usecase.token';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('v2/product')
@ApiTags('v2/product')
export class ProductController {
  constructor(
    @Inject(UseCase.CREATE_PRODUCT)
    private readonly createProductUseCase: UseCaseProxy<createProductUseCase>,
    private readonly prisma: PrismaService,
  ) {}

  @Post(':userId')
  public async create(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.createProductUseCase
      .getInstance()
      .run(userId, createProductDto);
  }
}
