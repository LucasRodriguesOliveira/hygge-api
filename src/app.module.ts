import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './infrastructure/config/env/env.config';
import { ControllerModule } from './infrastructure/controller/controller.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { UseCaseProxyModule } from './infrastructure/useCaseProxy/usecase-proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    // ThrottlerModule.forRoot(throttlerConfig),
    // LoggerModule.forRootAsync(loggerConfig()),
    PrismaModule,
    UseCaseProxyModule.register(),
    ControllerModule,
  ],
  // providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
