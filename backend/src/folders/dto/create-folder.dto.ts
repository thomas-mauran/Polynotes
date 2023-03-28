import { IsMongoId, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateFolderDto {
  @IsNotEmpty()
  readonly isRoot: boolean;

  @IsMongoId()
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  readonly parentId: string;
}
