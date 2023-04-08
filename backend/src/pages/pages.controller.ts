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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Page } from './schemas/pages.schema'; // import the Page schema

@ApiTags('Pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pageService: PagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create page' })
  @ApiResponse({ status: 201, description: 'Page created' })
  @ApiBody({ type: CreatePageDto })
  @ApiResponse({ status: 201, description: 'Page created', type: Page })
    async createPage(@Body() body: CreatePageDto) {
    return await this.pageService.create(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBody({ type: UpdateRightsDto })
  @ApiOperation({ summary: 'Get page' })
  @ApiResponse({ status: 200, description: 'Page found', type: Page })
  async getPage(@Req() req: Request, @Param('id') pageId: string) {
    const bearerToken = req.headers.authorization?.split(' ')[1];
    return await this.pageService.find({ pageId }, bearerToken);

  }

  @UseGuards(JwtAuthGuard)
  @Post('findOrCreate')
  @ApiOperation({ summary: 'Find or create page' })
  @ApiResponse({ status: 200, description: 'Page found', type: Page })
  @ApiResponse({ status: 201, description: 'Page created', type: Page })
  @ApiBody({ type: FindOrCreatePageDto })
  async findOrCreate(@Body() body: FindOrCreatePageDto) {
    return await this.pageService.findOrCreate(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Update page' })
  @ApiResponse({ status: 200, description: 'Page updated', type: Page })
  @ApiBody({ type: UpdatePageDto })
  async updatePage(@Req() req: Request, @Body() body: UpdatePageDto) {
    const bearerToken = req.headers.authorization?.split(' ')[1];
    return await this.pageService.updatePage(body, bearerToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('recentDocuments/:id')
  @ApiResponse({ status: 200, description: 'Recent documents found', type: [Page] })
  async getRecentDocuments(@Param('id') userId: string) {
    return await this.pageService.getLastUpdatedDocuments(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('findAll/:id')
  @ApiResponse({ status: 200, description: 'All pages found', type: [Page] })
  async getAllPages(@Param('id') userId: string) {
    return await this.pageService.getAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getTitle/:id')
  @ApiResponse({ status: 200, description: 'Page title found', type: String })
  async getPageTitle(@Param('id') pageId: string) {
    return await this.pageService.getTitle(pageId);
  }

  // update rights
  @UseGuards(JwtAuthGuard)
  @Patch('updateRights')
  @ApiOperation({ summary: 'Update page rights' })
  @ApiResponse({ status: 200, description: 'Page rights updated', type: Page })
  async updateRights(@Body() body: UpdateRightsDto) {
    const { pageId, readRights, updateRights } = body;
    return await this.pageService.updateRights(pageId, readRights, updateRights);
  }
}
