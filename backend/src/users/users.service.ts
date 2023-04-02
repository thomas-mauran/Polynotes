import {
  ConflictException,
  Injectable,
  NotFoundException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { MailService } from './mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
    private readonly mailService: MailService,
  ) {}

  // Find a user
  async findOne(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  // SIGNUP
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;
    const user = await this.userModel.findOne({ email: email });
    if (user) {
      throw new ConflictException('Email already used'); // Throw an error if the user doesn't exist
    }

    const token = uuid();



    await this.mailService.sendEmailVerificationLink(email, token);
    const createdUser = await this.userModel.create({
      username,
      email,
      password: await hash(password, 10),
      emailVerified: false,
      emailVerificationToken: token,
    });
    return createdUser;
  }

  // VERIFY EMAIL

  async verifyEmail(token: string) {
    const user = await this.userModel.findOne({
      emailVerificationToken: token,
    });

    // Check if user exists
    if (!user) {
      throw new NotFoundException('User not found'); // Throw an error if the user doesn't exist
    }

    await this.userModel.updateOne(
      { email: user.email },
      { emailVerified: true },
    );
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
