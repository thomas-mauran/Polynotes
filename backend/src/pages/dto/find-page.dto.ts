import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class FindPageDto {
  @IsMongoId()
  @IsOptional()
  readonly pageId: string;

  @IsMongoId()
  @IsOptional()
  readonly parentId: string;
}
