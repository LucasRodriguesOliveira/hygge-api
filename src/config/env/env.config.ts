import { ConfigModuleOptions } from '@nestjs/config';
import { appConfig } from './app.config';
import { envSchema } from './env.schema';
import { pinoConfig } from './pino.config';
import { swaggerConfig } from './swagger.config';
import { tokenConfig } from './token.config';

export const envConfig: ConfigModuleOptions = {
  load: [appConfig, pinoConfig, swaggerConfig, tokenConfig],
  validationSchema: envSchema,
};
