import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Res,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Response } from 'express';

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
    try {
      const user = await this.authService.login(req.user);
      response
        .cookie('JWTCookie', user.access_token, {
          httpOnly: true,
          secure: false,
        })
        .send({
          message: 'Success',
          access_token: user.access_token,
          email: user.email,
          username: user.username,
          user_id: user._id,
        });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('isOn')
  getHello(): string {
    return this.appService.getHello();
  }
}
