import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModuleAsyncParams } from 'nestjs-pino';
import { PinoConfig } from '../types/pino.config';

export const loggerConfig = (): LoggerModuleAsyncParams => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const { level, transport } = configService.get<PinoConfig>('pino');

    return {
      pinoHttp: {
        level,
        transport,
      },
    };
  },
});
