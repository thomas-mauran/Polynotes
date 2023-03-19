import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(4)
  readonly password: string;
}
