import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { AppConfig } from '../config/types/app.interface';
import { EnvMode } from '../config/types/mode.enum';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    super({
      log:
        configService.getOrThrow<AppConfig>('app').mode === EnvMode.DEVELOPMENT
          ? ['query', 'error']
          : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
