export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  userId: string;

  constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}
