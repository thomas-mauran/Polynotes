import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { FindPageDto } from './dto/find-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(private readonly pageService: PagesService) {}

  @Post()
  async getPage(@Body() body: FindPageDto) {
    return await this.pageService.findOrCreate(body);
  }

  @Patch()
  async updatePage(@Body() body: UpdatePageDto) {
    return await this.pageService.updatePage(body);
  }
}
