import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePageDto {
  @ApiProperty({ example: 'Page title', description: 'Page title' })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: '642d4f6c0d3b9748f6f19ef1',
    description: 'Mongo db id of parent folder',
  })
  @IsMongoId()
  @IsOptional()
  readonly parentId: string;

  @ApiProperty({
    example: '642d4f6c0d3b9748f6f19ef1',
    description: 'Mongo db id of user',
  })
  @IsMongoId()
  @IsNotEmpty()
  readonly userId: string;
}
