import { Controller, Get, Post, UseGuards, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.login(req.user);

    res.cookie('AuthCookie', cookieValue);

    return { message: 'Login successful' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('isOn')
  getHello(): string {
    return this.appService.getHello();
  }
}
