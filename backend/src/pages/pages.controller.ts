import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FindPageDto } from './dto/find-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(private readonly pageService: PagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async getPage(@Body() body: FindPageDto) {
    return await this.pageService.findOrCreate(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updatePage(@Body() body: UpdatePageDto) {
    return await this.pageService.updatePage(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('recentDocuments/:id')
  async getRecentDocuments(@Param('id') userId: string) {
    return await this.pageService.getLastUpdatedDocuments(userId);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('tree/:id')
  // async getTree(@Param('id') userId: string) {
  //   return await this.pageService.getElementAsTree(userId);
  // }
}
