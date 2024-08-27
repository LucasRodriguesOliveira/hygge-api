import { ConfigModuleOptions } from '@nestjs/config';
import { appConfig } from './app.config';
import { envSchema } from './env.schema';

export const envConfig: ConfigModuleOptions = {
  load: [appConfig],
  validationSchema: envSchema,
};
