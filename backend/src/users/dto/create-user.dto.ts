import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator'

export class CreateUserDto{
    @IsNotEmpty()
    @MaxLength(50)
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string; 

    @IsNotEmpty()
    @MaxLength(255)
    readonly password: string;
}