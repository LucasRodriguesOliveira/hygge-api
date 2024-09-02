import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { PrismaClientKnownError } from '../../prisma/prismaErrors.enum';
import { FindUserResponse } from '../user/dto/find-user.response';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignInResponse } from './dto/sign-in.response';
import { JwtPayload } from './types/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({
    email,
    password,
  }: SignInDto): Promise<FindUserResponse> {
    let user: User;

    try {
      user = await this.userService.findByEmail(email);
    } catch (err) {
      const { code } = err as PrismaClientKnownRequestError;

      if (PrismaClientKnownError.NOT_FOUND === code) {
        throw new NotFoundException('User not found.');
      }
    }

    const isPasswordValid = await this.userService.validatePassword(
      user,
      password,
    );

    if (isPasswordValid) {
      throw new UnauthorizedException();
    }

    return plainToInstance(FindUserResponse, user);
  }

  async signIn({ user }: Request): Promise<SignInResponse> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
