import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Page, PagesDocument } from 'src/pages/schemas/pages.schema';
import { CreateFolderDto } from './dto/create-folder.dto';
import { Folder, FoldersDocument } from './schemas/folder.schema';
const mongoose = require('mongoose');

@Injectable()
export class FoldersService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<FoldersDocument>,
    @InjectModel(Page.name) private pageModel: Model<PagesDocument>,
  ) {}

  // CREATE
  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    let { parentId, isRoot, userId, title } = createFolderDto;

    const parentFolder = await this.folderModel.findById(parentId).exec();
    if (!parentFolder && !isRoot) {
      throw new NotFoundException('Parent folder not found');
    }

    const folder = await this.folderModel.create({
      isRoot,
      title,
      author: userId,
      childList: [],
    });
    folder.save();

    if (!isRoot) {
      // check if parent id is a valid id
      if (mongoose.Types.ObjectId.isValid(parentId)) {
        await this.folderModel.updateOne(
          { _id: parentId },
          {
            $push: {
              childList: {
                id: folder._id,
                type: 'folder',
              },
            },
          },
        );
      }
    }

    return folder;
  }

  async generateTree(userId: ObjectId) {
    const folders = await this.folderModel.find({
      author: userId,
      isRoot: true,
    });

    const returnTree = [];
    for (const folder of folders) {
      if (folder.childList.length > 0) {
        console.log(folder.childList.length);
        const tree = await this.recursiveFind(folder.childList);
        console.log(tree);
        returnTree.push({
          id: folder._id,
          title: folder.title,
          children: tree,
        });
      } else {
        returnTree.push({
          id: folder._id,
          title: folder.title,
          children: [],
        });
      }
    }
    return returnTree;
  }

  async recursiveFind(
    childList: FolderElement[],
  ): Promise<RecursiveFindResult[] | undefined> {
    const results: RecursiveFindResult[] = [];

    for (const child of childList) {
      console.log(child);
      // Check if it is a page meaning there is no childList
      if (child.type == 'page') {
        const page = await this.pageModel.findById(child.id);
        if (page) {
          results.push({ id: page.id, title: page.title });
        }
      } else {
        // it is a folder so we need to check if it has children
        const folder = await this.folderModel.findById(child.id);
        if (!folder) {
          continue;
        }

        if (folder && folder.childList.length > 0) {
          const childResults = await this.recursiveFind(folder.childList);
          if (childResults) {
            results.push({
              id: folder.id,
              title: folder.title,
              children: childResults,
            });
          } else {
            results.push({ id: folder.id, title: folder.title, children: [] });
          }
        } else {
          results.push({ id: folder.id, title: folder.title, children: [] });
        }
      }
    }

    if (results.length > 0) {
      return results;
    } else {
      return undefined;
    }
  }
}
