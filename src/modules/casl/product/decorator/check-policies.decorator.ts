import { SetMetadata } from '@nestjs/common';
import { PolicyHandler } from '../types/policy.handler';

export const CHECK_POLICIES_TOKEN = Symbol('CHECK_POLICY');
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_TOKEN, handlers);
