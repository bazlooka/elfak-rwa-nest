import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { Public } from '../auth/decorators/public-endpoint.decorator';
import { UserCreateDto } from './models/user.create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: UserCreateDto) {
    return this.userService.register(createUserDto);
  }

  @Get('my-profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
