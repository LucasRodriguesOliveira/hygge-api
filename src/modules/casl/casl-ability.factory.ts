import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { RequestUser } from '../../shared/types/request-user';
import { FindProductResponse } from '../product/dto/find-product.response';
import { Actions } from './actions';
import { ProductAbility } from './product/types/product.ability';
import { Subjects } from './product/types/product.subjects';

@Injectable()
export class CaslAbilityFactory {
  public createForUser(user: RequestUser) {
    const { can, build } = new AbilityBuilder<Ability<[Actions, Subjects]>>(
      Ability as AbilityClass<ProductAbility>,
    );

    can(Actions.Read, 'all');
    can(Actions.Update, FindProductResponse, { userId: user.id });
    can(Actions.Delete, FindProductResponse, { userId: user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
