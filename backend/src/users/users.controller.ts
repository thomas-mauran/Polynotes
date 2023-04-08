import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  HttpStatus,
  Param,
  Res,
  Redirect,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('verify-email/:token')
  @Redirect('https://polynotes.cluster-2022-6.dopolytech.fr', 302) // use optional chaining operator and fallback to a default value  @Get('verify-email/:token')
  @ApiOperation({ summary: 'Verify email' })
  @ApiResponse({ status: 302, description: 'Email verified so redirect to the frontend login' })
  async verifyEmail(@Param('token') token: string) {
    return await this.userService.verifyEmail(token);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created' })
  async createUser(@Body() createUserDto: CreateUserDto) {
      await this.userService.create(createUserDto);
      return `A verification email has been sent to the following email address: ${createUserDto.email}`;
    
  }
}
