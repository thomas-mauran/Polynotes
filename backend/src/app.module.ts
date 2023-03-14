import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PagesModule } from './pages/pages.module';
import { UsersModule } from './users/users.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({
  imports: [PagesModule, UsersModule, MongooseModule.forRootAsync({
    useFactory: async(): Promise<MongooseModuleOptions> => ({
        uri: 'mongodb://172.20.0.2:27017/polynote',
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}