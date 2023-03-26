import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePageDto {
  @IsNotEmpty()
  readonly title: string;

  @IsMongoId()
  @IsOptional()
  readonly parentId: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly userId: string;
}
