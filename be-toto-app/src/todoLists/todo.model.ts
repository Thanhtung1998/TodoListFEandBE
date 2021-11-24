import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    _idUser: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        max: 50,
    },
    description: {
        type: String,
        required: true,
        min: 6,
    },
    date: {
        type: String,
        default: "",
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        default: "normal"
    }
})

export interface Todo extends mongoose.Document {
    id: string;
    _idUser: string;
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    priority: string;
}