import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { User, UsersDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;
    const createdUser = new this.userModel({
      username,
      email,
      password: await hash(password, 10),
      emailVerified: false,
    });
    return createdUser.save();
  }

  async login(loginUserDto: LoginUserDto): Promise<string | null> {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new NotFoundException('User not found'); // Throw an error if the user doesn't exist
    }
    const passwordMatching = await compare(password, user.password);

    if (passwordMatching === false) {
      throw new UnauthorizedException('Invalid Password'); // Throw an error if the password don't match
    }

    return this.jwtService.sign({ username: user.username });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
