import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request as IRequest } from 'express';
import { CreateUserResponse } from '../user/dto/create-user.response';
import { AuthService } from './auth.service';
import { SignInResponse } from './dto/sign-in.response';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: SignInResponse,
  })
  @ApiBody({
    type: SignInDto,
  })
  public async logIn(@Request() request: IRequest): Promise<SignInResponse> {
    return this.authService.signIn(request);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: CreateUserResponse,
  })
  public async register(
    @Body(ValidationPipe) signUpDto: SignUpDto,
  ): Promise<CreateUserResponse> {
    return this.authService.signUp(signUpDto);
  }
}
