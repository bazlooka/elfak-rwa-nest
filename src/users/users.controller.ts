import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  Query,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Public } from '../auth/decorators/public-endpoint.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { UserCreateDto } from './models/user.create.dto';
import { UserUpdateDto } from './models/user.update.dto';
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

  @Roles(Role.Admin)
  @Get()
  async searchUsers(@Query('q') q: string) {
    return this.userService.search(q);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UserUpdateDto,
  ) {
    return this.userService.updateUser(id, dto);
  }
}
