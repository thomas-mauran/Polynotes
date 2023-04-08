import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateRightsDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly pageId: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly readRights: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly updateRights: boolean;
}
