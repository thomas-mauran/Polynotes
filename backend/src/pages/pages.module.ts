import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FoldersSchema } from 'src/folders/schemas/folder.schema';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { Page, PagesSchema } from './schemas/pages.schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User, UsersSchema } from 'src/users/schemas/users.schema';
import { UsersModule } from 'src/users/users.module';
import { MailService } from 'src/users/mail.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UsersSchema },
      { name: Page.name, schema: PagesSchema },
      { name: Folder.name, schema: FoldersSchema },
    ]),
    UsersModule,
  ],
  controllers: [PagesController],
  providers: [PagesService, AuthService, JwtService, UsersService, MailService],
  exports: [PagesService, AuthService],
})
export class PagesModule {}
