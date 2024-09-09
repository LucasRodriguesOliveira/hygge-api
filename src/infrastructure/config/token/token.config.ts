import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { TokenConfig } from '../types/token.interface';

export const tokenConfig = (): JwtModuleAsyncOptions => {
  return {
    global: true,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const { secret } = configService.getOrThrow<TokenConfig>('token');

      return {
        secret,
        global: true,
        signOptions: {
          expiresIn: '60s',
        },
      };
    },
  };
};
