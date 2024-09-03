import { FindProductResponse } from '../../../product/dto/find-product.response';
import { ProductAbility } from './product.ability';

export type PolicyHandlerCallback = (
  ability: ProductAbility,
  product: FindProductResponse,
) => boolean;
