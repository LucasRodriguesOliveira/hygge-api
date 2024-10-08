import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { envConfig } from './config/env/env.config';
import { ProductModule } from './modules/product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { loggerConfig } from './config/logger/pino.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { throttlerConfig } from './config/throttler/throttler.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    ThrottlerModule.forRoot(throttlerConfig),
    LoggerModule.forRootAsync(loggerConfig()),
    PrismaModule,
    AuthModule,
    UserModule,
    ProductModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
