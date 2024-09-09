export class UseCaseProxy<T> {
  constructor(private readonly useCase: T) {}
  getInstance() {
    return this.useCase;
  }
}
