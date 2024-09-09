import { TokenConfig } from '../types/token.interface';

export const tokenConfig = (): { token: TokenConfig } => {
  return {
    token: {
      secret: process.env.SECRET_TOKEN,
    },
  };
};
