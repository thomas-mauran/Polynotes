interface BaseBlock {
  type: string;
  id: string;
  focus: boolean;
  settingsOpen?: boolean; // added property with optional modifier
}

export interface TextBlockType extends BaseBlock {
  html: string;
}

export interface DatabaseBlockType extends BaseBlock {
  html: any;
  settingsOpen: boolean;
}
export interface ImageBlockType extends BaseBlock {
  html: string;
  settingsOpen: boolean;
}

export interface MultiColumnBlock extends BaseBlock {
  html: BlockType[][];
  settingsOpen: boolean;
}

export type BlockType =
  | TextBlockType
  | DatabaseBlockType
  | ImageBlockType
  | MultiColumnBlock;

export interface UpdatePageTypeBody {
  blocks: BlockType[];
  slashMenuBlockId: string | null;
  author: string;
}

export interface UpdatePageTypeFull extends UpdatePageTypeBody {
  title?: string;
  thumbnailSrc?: string | null;
}
