import { DynamicModule, Module } from '@nestjs/common';
import { RepositoryModule } from '../repositories/repository.module';
import { CreateProductProxy } from './proxies/create-product/createProduct.proxy';
import { UseCase } from './usecase.token';

@Module({
  imports: [RepositoryModule],
})
export class UseCaseProxyModule {
  static register(): DynamicModule {
    return {
      module: UseCaseProxyModule,
      providers: [CreateProductProxy],
      exports: [UseCase.CREATE_PRODUCT],
    };
  }
}
