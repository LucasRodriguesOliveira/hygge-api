import { IFormatException } from './format-expection.interface';

export interface IException {
  badRequest(data: IFormatException): void;
  internalServer(data: IFormatException): void;
  forbidden(data: IFormatException): void;
  unauthorized(data: IFormatException): void;
  notFound(data: IFormatException): void;
}
