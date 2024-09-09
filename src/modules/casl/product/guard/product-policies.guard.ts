import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { FindProductResponse } from '../../../product/dto/find-product.response';
import { CaslAbilityFactory } from '../../casl-ability.factory';
import { CHECK_POLICIES_TOKEN } from '../decorator/check-policies.decorator';
import { PolicyHandler } from '../types/policy.handler';
import { ProductAbility } from '../types/product.ability';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { PrismaClientKnownError } from '../../../../infrastructure/prisma/prismaErrors.enum';

@Injectable()
export class ProductPoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_TOKEN,
        context.getHandler(),
      ) || [];

    const {
      user,
      params: { productId },
    }: Request = context.switchToHttp().getRequest();
    let product: FindProductResponse;

    try {
      const result = await this.prisma.product.findFirstOrThrow({
        where: {
          id: productId,
        },
      });

      product = plainToInstance(FindProductResponse, result);
    } catch (err) {
      const { code } = err as PrismaClientKnownRequestError;

      if (PrismaClientKnownError.NOT_FOUND === code) {
        throw new NotFoundException('Product could not be found');
      }
    }

    const ability = this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) =>
      this.run(handler, ability, product),
    );
  }

  private run(
    handler: PolicyHandler,
    ability: ProductAbility,
    product: FindProductResponse,
  ) {
    if (typeof handler === 'function') {
      return handler(ability, product);
    }

    return handler.handle(ability, product);
  }
}
