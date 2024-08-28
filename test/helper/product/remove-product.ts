import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../../../src/prisma/prisma.service';

export const removeProduct = async (
  app: INestApplication,
  productId: string,
): Promise<boolean> => {
  const prisma = app.get<PrismaService>(PrismaService);
  const deletedProduct = await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  return deletedProduct !== null;
};
