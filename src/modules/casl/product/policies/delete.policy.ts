import { FindProductResponse } from '../../../product/dto/find-product.response';
import { Actions } from '../../actions';
import { ProductAbility } from '../types/product.ability';

export const DeletePolicy = (
  ability: ProductAbility,
  product: FindProductResponse,
) => ability.can(Actions.Delete, product);
