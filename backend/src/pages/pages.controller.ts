import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePageDto } from './dto/create-page.dto';
import { FindOrCreatePageDto } from './dto/find-or-create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PagesService } from './pages.service';
import { UpdateRightsDto } from './dto/update-rights.dto';
import { Request } from 'express';

@Controller('pages')
export class PagesController {
  constructor(private readonly pageService: PagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPage(@Body() body: CreatePageDto) {
    return await this.pageService.create(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPage(@Req() req: Request, @Param('id') pageId: string) {
    const bearerToken = req.headers.authorization?.split(' ')[1];
    return await this.pageService.find({ pageId }, bearerToken);

  }

  @UseGuards(JwtAuthGuard)
  @Post('findOrCreate')
  async findOrCreate(@Body() body: FindOrCreatePageDto) {
    return await this.pageService.findOrCreate(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch()
  async updatePage(@Req() req: Request, @Body() body: UpdatePageDto) {
    const bearerToken = req.headers.authorization?.split(' ')[1];
    return await this.pageService.updatePage(body, bearerToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('recentDocuments/:id')
  async getRecentDocuments(@Param('id') userId: string) {
    return await this.pageService.getLastUpdatedDocuments(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('findAll/:id')
  async getAllPages(@Param('id') userId: string) {
    return await this.pageService.getAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getTitle/:id')
  async getPageTitle(@Param('id') pageId: string) {
    return await this.pageService.getTitle(pageId);
  }

  // update rights
  @UseGuards(JwtAuthGuard)
  @Patch('updateRights')
  async updateRights(@Body() body: UpdateRightsDto) {
    console.log("fesses")
    const { pageId, readRights, updateRights } = body;
    return await this.pageService.updateRights(pageId, readRights, updateRights);
  }
}
