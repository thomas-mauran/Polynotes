import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ObjectId, Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateFolderDto } from './dto/create-folder.dto';
import { FoldersService } from './folders.service';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createFolder(@Body() body: CreateFolderDto) {
    return await this.foldersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/tree/:id')
  async getTree(@Param('id') userId: ObjectId) {
    return await this.foldersService.generateTree(userId);
  }
}
