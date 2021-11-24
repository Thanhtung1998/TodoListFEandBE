import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose'
import { TodoModule } from './todoLists/todo.module'

const URL = process.env.URL_MONGOOSE

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TodoModule,
    MongooseModule.forRoot(URL, {
      autoCreate: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
