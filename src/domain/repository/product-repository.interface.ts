import { Product } from '../model/product';

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  update(id: number, name: string): Promise<Product>;
  delete(id: number): Promise<boolean>;
}
