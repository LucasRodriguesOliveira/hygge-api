import { Ability } from '@casl/ability';
import { Actions } from '../../actions';
import { Subjects } from './product.subjects';

export type ProductAbility = Ability<[Actions, Subjects]>;
