import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { BlockType } from '../types/PageTypes';

export class UpdatePageDto {
  @IsMongoId()
  @IsOptional()
  readonly pageId: string;

  @IsNotEmpty()
  readonly update: Object;
}
