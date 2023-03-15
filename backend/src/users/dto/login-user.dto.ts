import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator'

export class LoginUserDto{
    @IsNotEmpty()
    @IsEmail()
    readonly email: string; 

    @IsNotEmpty()
    @MaxLength(255)
    readonly password: string;
}