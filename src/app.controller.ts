import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/decorators/public-endpoint.decorator';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('user/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('user/register')
  async register(@Request() req) {
    return this.authService.login(req.user);
  }

  // @Get('user/profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  // @Roles(Role.Admin)
  // @Get('user/profile2')
  // getProfileBanned(@Request() req) {
  //   return req.user;
  // }
}
