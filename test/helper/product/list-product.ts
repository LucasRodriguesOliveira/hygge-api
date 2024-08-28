import { INestApplication } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '../../../src/prisma/prisma.service';

export const listProduct = async (
  app: INestApplication,
  namePrefix: string,
): Promise<Product[]> => {
  const prisma = app.get<PrismaService>(PrismaService);
  return prisma.product.findMany({
    where: {
      name: {
        startsWith: namePrefix,
        mode: 'insensitive',
      },
    },
  });
};
