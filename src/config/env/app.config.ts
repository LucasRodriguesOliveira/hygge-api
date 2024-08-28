import { AppConfig } from '../types/app.interface';
import { EnvMode } from '../types/mode.enum';

export const APP_TOKEN = Symbol('app');

export const appConfig = (): { app: AppConfig } => {
  const { NODE_ENV } = process.env;
  let mode: EnvMode;

  switch (NODE_ENV) {
    case 'develop':
    case 'development':
      mode = EnvMode.DEVELOPMENT;
      break;
    case 'prod':
    case 'production':
      mode = EnvMode.PRODUCTION;
      break;
    case 'test':
      mode = EnvMode.TEST;
      break;
    default:
      mode = EnvMode.DEVELOPMENT;
  }

  return {
    app: {
      port: parseInt(process.env.API_PORT ?? '3000', 10),
      mode,
    },
  };
};
