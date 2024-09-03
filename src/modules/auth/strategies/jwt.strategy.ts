import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenConfig } from '../../../config/types/token.interface';
import { JwtPayload } from '../types/jwt-payload.interface';
import { RequestUser } from '../../../shared/types/request-user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<TokenConfig>('token').secret,
    });
  }

  public async validate(payload: JwtPayload): Promise<RequestUser> {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
