import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Page, PagesDocument } from './schemas/pages.schema';
import { v4 as uuidv4 } from 'uuid';
import { FindPageDto } from './dto/find-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Folder, FoldersDocument } from 'src/folders/schemas/folder.schema';
import { BlockType, UpdatePageTypeFull } from './types/PageTypes';

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<PagesDocument>,
    @InjectModel(Folder.name) private folderModel: Model<FoldersDocument>,
  ) {}

  // FIND OR CREATE

  async findOrCreate(body: FindPageDto) {
    const { pageId, parentId, userId } = body;

    if (pageId != null) {
      const pageFound = await this.pageModel.findById(pageId).exec();
      if (pageFound) {
        return pageFound;
      }
    }
    if (parentId != null) {
      const parentFound = await this.folderModel.findById(parentId).exec();
      if (!parentFound) {
        throw new NotFoundException('Parent folder not found');
      }
    }

    // If we didn't find the page we need to create it and add it to it's parent childPage
    const page = await this.pageModel.create({
      typeOfDocument: 'page',
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
      author: userId,
    });

    await this.folderModel.findByIdAndUpdate(
      parentId,
      { $push: { childList: { id: page._id, type: 'page' } } },
      { new: true },
    );
    return page;
  }

  async updatePage(body: UpdatePageDto) {
    const { pageId, update } = body;
    console.log(update);
    const title = this.findElementInBlockList(update.blocks, 'h1');
    const thumbnailSrc = this.findElementInBlockList(update.blocks, 'img');

    const fullObject: UpdatePageTypeFull = update;
    fullObject.title = title ?? 'Untitled';
    fullObject.thumbnailSrc = thumbnailSrc ?? null;

    const updatedPage = await this.pageModel.findByIdAndUpdate(pageId, update, {
      new: true,
    });
    return updatedPage;
  }

  async getLastUpdatedDocuments(userId: string) {
    return await this.pageModel
      .find({ author: userId })
      .sort({ updatedAt: 'desc' })
      .limit(10);
  }

  findElementInBlockList(blockList: BlockType[], type: string) {
    for (const block of blockList) {
      if (block.type === type) {
        return block.html;
      }
    }
  }
}
