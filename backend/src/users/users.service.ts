import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { User, UsersDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectConnection() private connection: Connection, @InjectModel(User.name) private userModel: Model<UsersDocument>){}

    // async create(createUserDto: CreateUserDto): Promise<User> {
    //     const { username, email, password } = createUserDto;
    //     const createdUser = new this.userModel({
    //         username,
    //         email,
    //         password: await hash(password, 10),
    //     })
    //     return createdUser.save()
    // }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
      }

}
