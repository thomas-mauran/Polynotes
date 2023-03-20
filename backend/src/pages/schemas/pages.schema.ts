import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { BlockType } from '../types/PageTypes';

export type PagesDocument = HydratedDocument<Page>;

@Schema()
export class Page {
  @Prop({ required: true, type: [Object] })
  blocks: BlockType[];

  @Prop({ type: String, default: null })
  slashMenuBlockId: string | null;

  @Prop({ default: [] })
  childList: string[];

  @Prop({ required: true })
  creator: string;
}

export const PagesSchema = SchemaFactory.createForClass(Page);
