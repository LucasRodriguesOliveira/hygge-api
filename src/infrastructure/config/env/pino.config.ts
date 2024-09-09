import { PinoConfig } from '../types/pino.interface';

export const pinoConfig = (): { pino: PinoConfig } => {
  const { NODE_ENV = 'development' } = process.env;

  const isProduction = NODE_ENV === 'production';

  return {
    pino: {
      level: isProduction ? 'info' : 'debug',
      transport: isProduction ? undefined : { target: 'pino-pretty' },
    },
  };
};
