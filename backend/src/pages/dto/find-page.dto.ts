import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class FindPageDto {
  @ApiProperty({example: '642d4f6c0d3b9748f6f19ef1', description: 'Mongo db id of the page'})
  @IsMongoId()
  @IsOptional()
  readonly pageId: string;
}
