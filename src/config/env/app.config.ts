import { AppConfig } from '../types/app.config';

export const APP_TOKEN = Symbol('app');

export const appConfig = (): { app: AppConfig } => ({
  app: {
    port: parseInt(process.env.API_PORT ?? '3000', 10),
  },
});
