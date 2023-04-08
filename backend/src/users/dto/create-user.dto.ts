import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'User name' })
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  readonly username: string;

  @ApiProperty({ example: 'email@email.com', description: 'User email' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'password', description: 'User password' })
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(4)
  readonly password: string;
}
