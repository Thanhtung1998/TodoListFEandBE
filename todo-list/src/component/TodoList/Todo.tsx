import * as React from 'react';
import { useState } from 'react';
import { ITodo } from './todoInterface';
import { TodoForm } from './TodoForm'
import './Todo.css'

export interface TodoListProps {
    updateTodo: any
    todolists: any
    completeTodo: any
    removeTodo: any
    setIsEdit: any
}

export function Todo(props: TodoListProps) {

    const { updateTodo, todolists, setIsEdit, removeTodo, completeTodo } = props

    const data: ITodo = {
        id: '',
        title: '',
        description: '',
        date: '',
        isCompleted: false,
        priority: ''
    }

    const [edit, setEdit] = useState(data);

    const submitUpdate = (value: any) => {
        updateTodo(edit.id, value)
        setIsEdit(false)
        setEdit({ id: '', title: '', isCompleted: false, description: '', priority: '', date: '', })
    }

    const handleCancel = () => {
        setIsEdit(false)
        setEdit({ id: '', title: '', isCompleted: false, description: '', priority: '', date: '', })
    }

    if (edit.id) {
        return (
            <>
                <TodoForm edit={edit} onSubmit={submitUpdate} />
                <button className="todo-button w-full" onClick={handleCancel}> Cancel Update </button>
            </>
        )
    }

    return (
        <>
            {todolists && (
                todolists.sort(function (todo: any, todo2: any) {
                    return (new Date(todo.date).valueOf()) - (new Date(todo2.date).valueOf())

                }).map((todo: any, index: number) => (
                    <div
                        className={todo.isCompleted ? 'todo-row complete' : 'todo-row'}
                        key={index}
                    >

                        <div className="flex items-center h-full space-x-2" key={todo._id} >
                            {!todo.isCompleted && (
                                <input onClick={() => completeTodo(todo._id)} className="checkbox-css cursor-pointer" type="checkbox" defaultChecked={todo.isCompleted ? true : false}>

                                </input>
                            )}
                            <span>{todo.title}</span>
                        </div>
                        <div className="button space-x-2">

                            <button className="button-edit bg-green-500" onClick={() => {
                                setIsEdit(true);
                                setEdit({ id: todo._id, title: todo.title, description: todo.description, date: todo.date, isCompleted: todo.isCompleted, priority: todo.priority });
                            }
                            }

                            >
                                Details
                            </button>
                            <button className="button-remove bg-red-500" onClick={() => removeTodo(todo._id)}>Remove</button>
                        </div>
                    </div>
                ))
            )
            }
        </>
    )
}
