import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes } from 'mongoose';
import { BlockType } from '../types/PageTypes';

export type PagesDocument = HydratedDocument<Page>;

@Schema({
  timestamps: true,
})
export class Page {
  @Prop({ required: true, type: [Object] })
  blocks: BlockType[];

  @Prop({ type: String, default: null })
  slashMenuBlockId: string | null;

  @Prop({ default: [] })
  childList: string[];

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  author: ObjectId;
}

export const PagesSchema = SchemaFactory.createForClass(Page);
