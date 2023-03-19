import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BlockType } from '../types/PageTypes';

export type PagesDocument = HydratedDocument<Page>;

@Schema()
export class Page {
  @Prop({ required: true, type: [Object] })
  blocks: BlockType[];

  @Prop({ type: String, default: null })
  slashMenuBlockId: string | null;

  @Prop({ type: String, default: null })
  parentId: string;

  @Prop({ default: [] })
  childList: string[];
}

export const PagesSchema = SchemaFactory.createForClass(Page);
