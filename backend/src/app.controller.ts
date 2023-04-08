import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Res,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { LoginUserDto } from './users/dto/login-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('')
  isUp(): string {
    return "I'm up and running !\n";
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiTags('Auth')
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Email not verified' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const user = await this.authService.login(req.user);
    if (user.emailVerified === false) {
      throw new UnauthorizedException('Email not verified');
    }
    try {
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
}
