import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserTodoSchema } from './user.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'usertodos', schema: UserTodoSchema }])
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }
