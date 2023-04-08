import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class FindOrCreatePageDto {
  @ApiProperty({
    example: '642d4f6c0d3b9748f6f19ef1',
    description: 'Mongo db id of the page',
  })
  @IsMongoId()
  @IsOptional()
  readonly pageId: string;

  @ApiProperty({
    example: '642d4f6c0d3b9748f6f19af1',
    description: 'Id of the parent folder',
  })
  @IsMongoId()
  @IsNotEmpty()
  readonly parentId: string;

  @ApiProperty({
    example: '642d4f6c0d3b9748f6f19ef1',
    description: 'Mongo db id of user',
  })
  @IsMongoId()
  @IsOptional()
  readonly userId: string;
}
