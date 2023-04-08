import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ObjectId, Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateFolderDto } from './dto/create-folder.dto';
import { FoldersService } from './folders.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Folders')
@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create folder' })
  @ApiResponse({ status: 201, description: 'Folder created' })
  @ApiBody({ type: CreateFolderDto })
  async createFolder(@Body() body: CreateFolderDto) {
    return await this.foldersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/tree/:id')
  @ApiOperation({ summary: 'Get folder tree' })
  @ApiResponse({ status: 200, description: 'Folder tree found' })
  async getTree(@Param('id') userId: ObjectId) {
    return await this.foldersService.generateTree(userId);
  }
}
