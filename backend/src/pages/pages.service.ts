import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PagesDocument } from './schemas/pages.schema';
import { v4 as uuidv4 } from 'uuid';
import { FindPageDto } from './dto/find-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<PagesDocument>,
  ) {}
  // FIND OR CREATE

  async findOrCreate(body: FindPageDto) {
    const { pageId, parentId } = body;

    if (pageId != null) {
      const pageFound = await this.pageModel.findById(pageId).exec();
      if (pageFound) {
        return pageFound;
      }
    }

    // If we didn't find the page we need to create it and add it to it's parent childPage
    const page = await this.pageModel.create({
      blocks: [
        {
          html: '',
          type: 'p',
          id: uuidv4(),
          settingsOpen: true,
          focus: true,
        },
      ],
      slashMenuBlockId: null,
      childList: [],
    });

    if (parentId != null) {
      await this.pageModel.findByIdAndUpdate(
        parentId,
        { $push: { childList: page._id } },
        { new: true },
      );
    }
    return page;
  }

  async updatePage(body: UpdatePageDto) {
    const { pageId, update } = body;
    const updatedPage = await this.pageModel.findByIdAndUpdate(pageId, update, {
      new: true,
    });
    return updatedPage;
  }
}
