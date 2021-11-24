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
import { query, response } from 'express';

import { TodoService } from './todo.service'


@Controller('api/v1/todo')

export class TodoController {
    constructor(private readonly todoService: TodoService) {

    }

    // _______________________ addTodo ____________________________
    @Post('/addTodo')
    async createUser(
        @Req() req,
        @Res() res
    ) {
        const generatedId = await this.todoService.insertTodo(req, res);
        return { id: generatedId, res: res, req: req };
    }

    @Get('all')
    async getAllTodo(
        @Req() req,
        @Res() res
    ) {
        const response = await this.todoService.getAllTodo(req.query, res)
        return res
    }

    @Get(":id")
    async getOneTodo(
        @Param("id") prodID: string,
        @Res() res
    ) {
        const response = await this.todoService.getOneTodo(prodID, res)
        return res
    }

    @Put('/completeTodo/:id')
    async completeTodo(
        @Param("id") prodID: string,
        @Res() res,
        @Req() req
    ) {
        const response = await this.todoService.completeTodo(prodID, res, req)
        return res
    }

    @Patch('updateTodo/:id')
    async updateTodo(
        @Param("id") prodID: string,
        @Res() res,
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('date') prodDate: string,
        @Body('priority') prodPriority: string,
    ) {
        const response = await this.todoService.updateTodo(prodID, res, prodTitle, prodDescription, prodPriority, prodDate)
        return res
    }


    @Delete('/removeTodo/:id')
    async removeTodo(@Param('id') prodId: string, @Res() res) {
        await this.todoService.removeTodo(prodId, res);
        return res
    }

}