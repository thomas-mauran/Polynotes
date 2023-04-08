import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { UpdatePageTypeBody } from '../types/PageTypes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePageDto {
  @ApiProperty({
    example: '642d4f6c0d3b9748f6f19ef1',
    description: 'Mongo db id of the page',
  })
  @IsMongoId()
  @IsOptional()
  readonly pageId: string;
  @ApiProperty({
    example: [
      {
        html: '<p>Updated title</p>',
        type: 'h1',
        id: '1234',
        focus: true,
      },
    ],
    description: 'Updates made to the page blocks',
  })
  @IsNotEmpty()
  readonly update: UpdatePageTypeBody;
}
