import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { Request as IRequest } from 'express';
import { FindUserResponse } from '../user/dto/find-user.response';
import { AuthService } from './auth.service';
import { SignInResponse } from './dto/sign-in.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: FindUserResponse,
  })
  public async signIn(@Request() request: IRequest): Promise<SignInResponse> {
    return this.authService.signIn(request);
  }
}
