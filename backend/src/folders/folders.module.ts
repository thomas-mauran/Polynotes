import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FoldersSchema } from './schemas/folder.schema';
import { Page, PagesSchema } from 'src/pages/schemas/pages.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Folder.name, schema: FoldersSchema },
      { name: Page.name, schema: PagesSchema },
    ]),
  ],
  providers: [FoldersService],
  controllers: [FoldersController],
  exports: [FoldersService],
})
export class FoldersModule {}
