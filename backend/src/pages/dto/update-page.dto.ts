import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePageDto {
  @IsMongoId()
  @IsOptional()
  readonly pageId: string;

  @IsNotEmpty()
  readonly update: Object;
}
