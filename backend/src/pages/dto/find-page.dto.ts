import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class FindPageDto {
  @IsMongoId()
  @IsOptional()
  readonly pageId: string;
}
