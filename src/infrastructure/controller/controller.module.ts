import { Module } from '@nestjs/common';
import { UseCaseProxyModule } from '../useCaseProxy/usecase-proxy.module';
import { ProductController } from './product/product.controller';

@Module({
  imports: [UseCaseProxyModule.register()],
  controllers: [ProductController],
})
export class ControllerModule {}
