import * as mongoose from 'mongoose';

export const UserTodoSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
        min: 6,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    photoURL: {
        type: String,
        default: "",
    },
})

export interface User extends mongoose.Document {
    id: string;
    displayName: string;
    email: string;
    password: string;
    photoURL: string;
}