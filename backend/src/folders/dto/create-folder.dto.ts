import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateFolderDto {
  @ApiProperty({
    example: 'false',
    description: 'If the folder is at root meaning it got no parents',
  })
  @IsNotEmpty()
  readonly isRoot: boolean;

  @ApiProperty({ example: '', description: 'Mongodb userId' })
  @IsMongoId()
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  readonly parentId: string;
}
