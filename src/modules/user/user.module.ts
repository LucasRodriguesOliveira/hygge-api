import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [ConfigModule],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
