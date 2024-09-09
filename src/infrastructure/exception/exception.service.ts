import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IException } from '../../domain/exception/exception.interface';
import { IFormatException } from '../../domain/exception/format-expection.interface';

@Injectable()
export class ExceptionService implements IException {
  internalServer({ message }: IFormatException): void {
    throw new InternalServerErrorException(message);
  }
  forbidden({ message }: IFormatException): void {
    throw new ForbiddenException(message);
  }
  unauthorized({ message }: IFormatException): void {
    throw new UnauthorizedException(message);
  }
  notFound({ message }: IFormatException): void {
    throw new NotFoundException(message);
  }
  badRequest({ message }: IFormatException): void {
    throw new BadRequestException(message);
  }
}
