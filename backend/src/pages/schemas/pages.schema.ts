import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes } from 'mongoose';
import { BlockType } from '../types/PageTypes';

export type PagesDocument = HydratedDocument<Page>;

@Schema({
  timestamps: true,
})
export class Page {
  @Prop({ type: String, default: 'Untitled' })
  title: string | null;

  @Prop({ type: String, default: null })
  thumbnailSrc: string | null;

  @Prop({ required: true, type: [Object] })
  blocks: BlockType[];

  @Prop({ type: String, default: null })
  slashMenuBlockId: string | null;

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  author: ObjectId;

  @Prop({ type: Boolean, default: false })
  readRights: boolean;

  @Prop({ type: Boolean, default: false })
  updateRights: boolean;
  
  @Prop({ type: Date, default: null })
  updatedAt: Date | null;
}

export const PagesSchema = SchemaFactory.createForClass(Page);
