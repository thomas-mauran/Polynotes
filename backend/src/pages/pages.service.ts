import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectExpression, ObjectId, Types } from 'mongoose';
import { Page, PagesDocument } from './schemas/pages.schema';
import { v4 as uuidv4 } from 'uuid';
import { FindPageDto } from './dto/find-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Folder, FoldersDocument } from 'src/folders/schemas/folder.schema';
import { CreatePageDto } from './dto/create-page.dto';
import { FindOrCreatePageDto } from './dto/find-or-create-page.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<PagesDocument>,
    @InjectModel(Folder.name) private folderModel: Model<FoldersDocument>,
    private authService: AuthService,
  ) {}

  // CREATE
  async create(body: CreatePageDto) {
    const { title, parentId, userId } = body;

    const parentFound = await this.folderModel.findById(parentId).exec();
    if (!parentFound) {
      throw new NotFoundException('Parent folder not found');
    }

    const page = await this.pageModel.create({
      typeOfDocument: 'page',
      title: title,
      thumbnailSrc: null,
      blocks: [
        {
          html: `<p>${title}</p>`,
          type: 'h1',
          id: uuidv4(),
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

  // FIND
  async find(body: FindPageDto, bearerToken: string | undefined) {
    const { pageId } = body;
    let user;

    // we check the user that ask for the page
    if (bearerToken != null) {
      user = await this.authService.findUserByToken(bearerToken);
    }

    const pageFound = await this.pageModel.findById(pageId).exec();
    if (!pageFound) {
      throw new NotFoundException('Page not found');
    }

    if (user && user?.id == pageFound.author) {
      // Code to execute if the condition is true
      pageFound.readRights = true;
      pageFound.updateRights = true;
    }
    if (pageFound.readRights == false) {
      throw new UnauthorizedException(
        "You don't have the rights to read this page",
      );
    }
    console.log(pageFound)
    return pageFound;
  }

  // FIND OR CREATE

  async findOrCreate(body: FindOrCreatePageDto) {
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

  // Update page
  async updatePage(body: UpdatePageDto, bearerToken: string | undefined) {
    const { pageId, update } = body;
    let user;
    let canUpdate;

    const page = await this.pageModel.findById(pageId).exec();

    // we check the user that ask for update, if he is the author of the page he can update it
    if (bearerToken != null) {
      user = await this.authService.findUserByToken(bearerToken);
      if (user?.id == page?.author) {
        canUpdate = true;
      }
    }

    // if the user is not the author of the page we check if he has the rights to update it
    if (page?.updateRights == true) {
      canUpdate = true;
    }

    if (canUpdate == true) {
      const updatedPage = await this.pageModel.findByIdAndUpdate(pageId, update, {
        new: true,
      });
      return updatedPage;

    }else{
      throw new UnauthorizedException("You don't have the rights to update this page")
    }
  }

  async getLastUpdatedDocuments(userId: string) {
    const pages = await this.pageModel
      .find({ author: userId })
      .sort({ updatedAt: 'desc' })
      .limit(10);
    return pages;
  }

  async getAll(userId: string) {
    const pages = await this.pageModel
      .find({ author: userId })
      .select({ title: 1, updatedAt: 1 });
    const returnList = [];

    // we need to format the data to be used in the select frontend component
    for (const page of pages) {
      // we create a new arraay of object {id, label}
      const label = page.title + ' - ' + page.updatedAt?.toLocaleDateString();
      const id = page._id;
      returnList.push({ id, label });
    }

    return returnList;
  }

  async getTitle(pageId: string) {
    const pageFound = await this.pageModel.findById(pageId).exec();

    if (!pageFound) {
      throw new NotFoundException('Page not found');
    }
    return pageFound.title;
  }

  //update rights
  async updateRights(
    pageId: string,
    readRights: boolean,
    updateRights: boolean,
  ) {
    const updatedPage = await this.pageModel.findByIdAndUpdate(
      pageId,
      { readRights, updateRights },
      { new: true },
    );
    console.log(updatedPage);
    return updatedPage;
  }
}
