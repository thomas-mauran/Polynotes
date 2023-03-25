import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes } from 'mongoose';

export type FoldersDocument = HydratedDocument<Folder>;

@Schema({
  timestamps: true,
})
export class Folder {
  @Prop({ required: true })
  isRoot: boolean;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  author: ObjectId;

  @Prop({ required: true, default: [] })
  childList: FolderElement[];
}

export const FoldersSchema = SchemaFactory.createForClass(Folder);
