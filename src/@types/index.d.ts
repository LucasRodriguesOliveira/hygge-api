import 'express-serve-static-core';
import { RequestUser } from '../shared/types/request-user';

declare module 'express-serve-static-core' {
  interface Request {
    user?: RequestUser;
  }
}
