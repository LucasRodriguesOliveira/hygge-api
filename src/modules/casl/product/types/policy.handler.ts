import { PolicyHandlerCallback } from './policy-handler.callback';
import { IPolicyHandler } from './policy-handler.interface';

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
