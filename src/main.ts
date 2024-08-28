import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { APP_TOKEN } from './config/env/app.config';
import { SWAGGER_TOKEN } from './config/env/swagger.config';
import { createSwaggerDocument } from './config/swagger/swagger.config';
import { AppConfig } from './config/types/app.interface';
import { SwaggerConfig } from './config/types/swagger.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const { docs } = configService.get<SwaggerConfig>(SWAGGER_TOKEN.description);

  SwaggerModule.setup(
    docs.path,
    app,
    createSwaggerDocument(app, configService),
  );

  const { port } = configService.get<AppConfig>(APP_TOKEN.description);

  app.use(helmet());

  await app.listen(port);
}
bootstrap();
