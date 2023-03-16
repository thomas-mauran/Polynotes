import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async fetchAll(): Promise<string> {
    console.log('fetching');
    return 'ek';
  }

  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token: string) {
    return await this.userService.verifyEmail(token);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);
      return `A verification email has been sent to the following email address: ${createUserDto.email}`;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error creating user',
        error: error.message,
      };
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
}
