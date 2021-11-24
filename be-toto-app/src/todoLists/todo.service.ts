import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { identity } from 'rxjs';
import { queryOption } from './queryOption.config'

import { Todo } from './todo.model'

@Injectable()
export class TodoService {
    constructor(@InjectModel('todoList') private readonly TodoModel: Model<Todo>) {

    }

    async insertTodo(req, res): Promise<any> {

        try {

            const newTodo = new this.TodoModel({
                _idUser: req.body._idUser,
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                isCompleted: req.body.isCompleted,
                priority: req.body.priority
            });

            const result = await newTodo.save();
            const data = {
                _id: result.id,
                _idUser: result._idUser,
                title: result.title,
                description: result.description,
                date: result.date,
                isCompleted: result.isCompleted,
                priority: result.priority
            }

            res.status(200).jsonp(data)

            return result.id as string;

        } catch (err) {
            res.status(500).json(err)
        }


    }

    async getAllTodo(options: queryOption, res) {
        const TodoRepository = this.TodoModel;

        const todo = await TodoRepository.find({ _idUser: options._idUser });

        const todoLists = todo.map(prod => ({
            _id: prod._id,
            _idUser: prod._idUser,
            title: prod.title,
            description: prod.description,
            date: prod.date,
            isCompleted: prod.isCompleted,
            priority: prod.priority,
        }))

        res.status(200).jsonp({ data: todoLists })
    }

    async getOneTodo(id, res) {
        const TodoRepository = this.TodoModel;
        const todo = await TodoRepository.findById(id).exec();
        const todoLists = todo
        res.status(200).jsonp({ data: todoLists })
    }

    async removeTodo(prodId: string, res) {
        const result = await this.TodoModel.deleteOne({ _id: prodId }).exec();
        // console.log(result.deletedCount)
        if (result.deletedCount === 1) {
            res.status(200).jsonp("Data Todo has been deleted");
        }
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find todo.');
        }
    }

    async completeTodo(id: string, res, req) {

        const TodoRepository = this.TodoModel;
        // console.log(id)
        const todo = await TodoRepository.findById(id).exec();

        todo.isCompleted = req.body.isCompleted

        res.status(200).jsonp({ data: todo })
        todo.save()

    }

    async updateTodo(id: string, res, title, description, priority, date) {
        const TodoRepository = this.TodoModel;
        const todo = await TodoRepository.findById(id).exec();

        if (title) {
            todo.title = title
        }
        if (description) {
            todo.description = description
        }
        if (priority) {
            todo.priority = priority
        }
        if (date) {
            todo.date = date
        }

        res.status(200).jsonp({ data: todo })
        todo.save()

    }

}