import { FindProductResponse } from '../../../product/dto/find-product.response';
import { ProductAbility } from './product.ability';

export interface IPolicyHandler {
  handle(ability: ProductAbility, product: FindProductResponse): boolean;
}
