import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request as IRequest } from 'express';
import { RequestUser } from '../../shared/types/request-user';

@Controller('user')
@ApiTags('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  public async getProfile(@Request() req: IRequest): Promise<RequestUser> {
    return req.user;
  }
}
