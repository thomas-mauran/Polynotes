import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PagesModule } from './pages/pages.module';
import { UsersModule } from './users/users.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './users/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { FoldersModule } from './folders/folders.module';

@Module({
  imports: [
    PagesModule,
    UsersModule,
    MongooseModule.forRootAsync({
      useFactory: async (): Promise<MongooseModuleOptions> => ({
        uri: 'mongodb://172.20.0.2:27017/polynotes',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAILER_HOST'),
          port: configService.get<number>('MAILER_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('MAILER_USER'),
            pass: configService.get<string>('MAILER_PASSWORD'),
          },
        },
        defaults: {
          from: '"No Reply" <noreply@polynotes.net>',
        },
      }),
      inject: [ConfigService], // Inject the ConfigService.
    }),
    AuthModule,
    FoldersModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService, AuthService, JwtService],
})
export class AppModule {}
