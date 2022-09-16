import { Controller, Post, Body } from '@nestjs/common';
import { Public } from '../auth/decorators/public-endpoint.decorator';
import { UserCreateDto } from './models/user.create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post('register')
  async register(@Body() userCreateDto: UserCreateDto) {
    return this.userService.register(userCreateDto);
  }
}
