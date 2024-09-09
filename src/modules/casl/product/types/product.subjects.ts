import { InferSubjects } from '@casl/ability';
import { RequestUser } from '../../../../shared/types/request-user';
import { FindProductResponse as Product } from '../../../product/dto/find-product.response';

export type Subjects =
  | InferSubjects<typeof Product | typeof RequestUser>
  | 'all';
