import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFolderDto {
  @IsNotEmpty()
  readonly isRoot: boolean;

  @IsMongoId()
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly title: string;

  @IsMongoId()
  @IsOptional()
  readonly parentId: string;
}
