import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FoldersSchema } from 'src/folders/schemas/folder.schema';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { Page, PagesSchema } from './schemas/pages.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Page.name, schema: PagesSchema },
      { name: Folder.name, schema: FoldersSchema },
    ]),
  ],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [PagesService],
})
export class PagesModule {}
