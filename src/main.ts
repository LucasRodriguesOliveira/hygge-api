import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/types/app.config';
import { APP_TOKEN } from './config/env/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const { port } = configService.get<AppConfig>(APP_TOKEN.description);

  await app.listen(port);
}
bootstrap();
