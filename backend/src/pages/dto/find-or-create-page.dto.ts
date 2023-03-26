import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class FindOrCreatePageDto {
  @IsMongoId()
  @IsOptional()
  readonly pageId: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly parentId: string;

  @IsMongoId()
  @IsOptional()
  readonly userId: string;
}
