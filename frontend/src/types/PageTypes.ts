import { CSSProperties } from "react";

export interface BoardData {
  lanes: Lane[];
}

export interface TableData {
  [index: number]: string[];
}

export interface SupageHTML {
  id: string;
  label: string;
}

export interface Lane {
  id?: string;
  title?: string;
  label?: string;
  style?: CSSProperties;
  cards?: Card[];
  currentPage?: number;
  droppable?: boolean;
  labelStyle?: CSSProperties;
  cardStyle?: CSSProperties;
  disallowAddingCard?: boolean;
  [key: string]: any;
}

export interface Card {
  id: string;
  title?: string;
  label?: string;
  description?: string;
  laneId?: string;
  style?: CSSProperties;
  draggable?: boolean;
  [key: string]: any;
}

interface BaseBlock {
  type: string;
  id: string;
  focus: boolean;
  settingsOpen?: boolean; // added property with optional modifier
}

export interface TextBlockType extends BaseBlock {
  html: string;
}

export interface SubpageBlock extends BaseBlock {
  html: SupageHTML
}

export interface DatabaseBlockType extends BaseBlock {
  html: { lanes: Lane[] };
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

export type BlockType = TextBlockType | DatabaseBlockType | ImageBlockType | MultiColumnBlock | SubpageBlock;

export interface StateType {
  pageId: string | null;
  author: string | null;
  readRights: boolean;
  updateRights: boolean;
  blocks: BlockType[];
  slashMenuBlockId: null | string;
}
