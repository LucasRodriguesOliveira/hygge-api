import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../shared/decorator/get-user.decorator';
import { RequestUser } from '../../shared/types/request-user';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ListOwnedProducts } from '../product/dto/list-owned-products.response';
import { ProductService } from '../product/product.service';
import { FindUserResponse } from './dto/find-user.response';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: FindUserResponse,
  })
  public async getProfile(
    @GetUser() user: RequestUser,
  ): Promise<FindUserResponse> {
    return this.userService.findById(user.id);
  }

  @Get('products')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: [ListOwnedProducts],
  })
  public async getUserProducts(
    @GetUser() user: RequestUser,
  ): Promise<ListOwnedProducts[]> {
    return this.productService.listByUser(user.id);
  }
}
