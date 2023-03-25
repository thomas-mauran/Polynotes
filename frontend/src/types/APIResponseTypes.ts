import { BlockType } from "./PageTypes";

export interface RecentDocuments {
  _id: string;
  title: string;
  thumbnailSrc: string | null;
  blocks: BlockType[];
  slashMenuBlockId: string | null;
  author: string;
  createdAt: string;
  updatedAt: string;
}
