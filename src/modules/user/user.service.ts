import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { APP_TOKEN } from '../../config/env/app.config';
import { AppConfig } from '../../config/types/app.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProductResponse } from '../product/dto/update-product.response';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponse } from './dto/create-user.response';
import { FindUserResponse } from './dto/find-user.response';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  public async list(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  public async findById(userId: string): Promise<FindUserResponse> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    return plainToInstance(FindUserResponse, user);
  }

  public async findByEmail(userEmail: string): Promise<User> {
    return this.prisma.user.findFirstOrThrow({
      where: {
        email: userEmail,
      },
    });
  }

  public async create(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    createUserDto.password = await this.hashPassword(createUserDto.password);

    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    return plainToInstance(CreateUserResponse, user);
  }

  public async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateProductResponse> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: updateUserDto,
    });

    return plainToInstance(UpdateProductResponse, user);
  }

  public async delete(userId: string): Promise<boolean> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return user.deletedAt !== null;
  }

  private async hashPassword(password: string): Promise<string> {
    const {
      user: {
        password: { saltRounds },
      },
    } = this.configService.get<AppConfig>(APP_TOKEN.description);
    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(password, salt);
  }

  public async validatePassword(
    user: User,
    passwordToCompare: string,
  ): Promise<boolean> {
    return bcrypt.compare(passwordToCompare, user.password);
  }
}
