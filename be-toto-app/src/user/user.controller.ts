import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Put,
    Req,
    Res,
} from '@nestjs/common';

import { UserService } from './user.service'


@Controller('api/v1/user')

export class UserController {
    constructor(private readonly userService: UserService) {

    }

    // _______________________ Register ____________________________
    @Post('/register')
    async createUser(
        @Req() req,
        @Res() res
    ) {
        const generatedId = await this.userService.insertUser(req, res);
        return { id: generatedId, res: res, req: req };
    }

    @Post("/login")
    async Login(@Req() req, @Res() res) {

        const user = await this.userService.Login(req, res)
        return user;

    }

}