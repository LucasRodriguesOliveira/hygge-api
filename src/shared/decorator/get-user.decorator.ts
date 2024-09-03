import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { RequestUser } from '../types/request-user';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (_, req: ExecutionContextHost): RequestUser => {
    const request: Request = req.switchToHttp().getRequest();
    return request.user;
  },
);
