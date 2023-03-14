import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Get()
    async fetchAll(): Promise<string>{
        console.log("fetching")
        return "ek"
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto){
        console.log(createUserDto)
    }
}
