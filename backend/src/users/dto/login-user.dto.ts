import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator'

export class LoginUserDto{
    @ApiProperty({ example: 'email@email.com', description: 'User email' })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string; 

    @ApiProperty({ example: 'password', description: 'User password' })
    @IsNotEmpty()
    @MaxLength(255)
    readonly password: string;
}