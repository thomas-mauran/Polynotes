import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateRightsDto {
  @ApiProperty({
    example: '642d4f6c0d3b9748f6f19ef1',
    description: 'Mongo db id of the page',
  })
  @IsMongoId()
  @IsNotEmpty()
  readonly pageId: string;

  @ApiProperty({ example: 'false', description: 'Read rights for the page' })
  @IsNotEmpty()
  @IsBoolean()
  readonly readRights: boolean;

  @ApiProperty({ example: 'false', description: 'Write rights for the page' })
  @IsNotEmpty()
  @IsBoolean()
  readonly updateRights: boolean;
}
