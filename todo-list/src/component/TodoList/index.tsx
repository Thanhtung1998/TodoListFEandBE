import React, { useState, useEffect } from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'
import './Todo.css'
import { SearchInput } from '../SearchInput'
import todoApi from '../../api/todoApi'
import axios from 'axios'
import { RootStateOrAny, useSelector } from "react-redux";
import { useAppDispatch } from '../../app/hooks'
import { todoActions } from '../../redux/todoSlice'
import { selectFilteredTodo } from '../../redux/todoSlice'

interface TodoList {

}

export function TodoList(props: TodoList) {

    const initialTodo: any = []

    const state = useSelector((state: RootStateOrAny) => state.user.user);

    const todoLists = useSelector(selectFilteredTodo)

    const dispatch = useAppDispatch();

    const [todolists, setTodos] = useState([...todoLists]);
    const [isEdit, setIsEdit] = useState(false)

    console.log(todolists)

    //useEffect
    useEffect(() => {
        const getTodos = async () => {
            const todosFromServer = await fetchTodos();
            const newArray = [...todosFromServer]
            dispatch(todoActions.addLocalStorage(newArray));
        }
        getTodos();
    }, [])

    // fetch todos 
    const fetchTodos = async () => {
        const res = await todoApi.getAllTodo(state.user._id)
        return res.data;
    }
    const fetchTodo = async (id: string) => {
        const res = await todoApi.getOneTodo(id)

        console.log(res)

        return res.data
    }

    fetchTodos();
    // Add Todo
    const addTodo = async (todo: any) => {

        const res = await todoApi.addTodo(todo)

        const newTodos = [...todolists, res] //toan tu rest
        dispatch(todoActions.addOneTask(res));
    };
    // Remove Todo
    const removeTodo = async (id: string) => {

        const res = await todoApi.removeTodo(id)

        const removeArr = todolists.filter((todo: any) => todo._id !== id)

        dispatch(todoActions.removeLocalStorage(id))
    }
    // Edit Todo
    const updateTodo = async (todoId: string, newValue: any) => {
        const res = await todoApi.updateTodo(todoId, newValue)
        // if (res) setTodos((prev: any) => prev.map((item: any) => (item._id === todoId ? newValue : item)))
        if (res) {
            const payload = {
                _id: todoId,
                data: newValue,
            }
            dispatch(todoActions.updateLocalStorage(payload))
        }
    }

    const completeTodo = async (id: any) => {
        const taskToToggle = await fetchTodo(id)
        const updTask = { ...taskToToggle, isCompleted: !taskToToggle.isCompleted }

        const res = await todoApi.completeTodo(id, updTask)

        // if (res) {
        //     let updatedTodo = todolists.map((todo: any) => {
        //         if (todo._id === id) {
        //             todo.isCompleted = !todo.isCompleted;
        //         }
        //         return todo;
        //     })
        //     setTodos(updatedTodo);
        // }
        if (res) {
            const payload = {
                _id: id,
                data: updTask
            }
            dispatch(todoActions.completeTask(payload))
        }
    }

    const handleFilterChange = (newFilter: any) => {
        dispatch(todoActions.searchTask(newFilter.input))
        // Call Api here or redux
    }

    useEffect(() => {
        setTodos([...todoLists])
    }, [todoLists])

    return (
        <div className="flex h-full w-full justify-center overflow-hidden">
            <div className="todo-form">

                {!isEdit && (
                    <>
                        <h1 className="font-bold text-3xl text-center my-10 text-white"> New Task </h1>
                        <TodoForm onSubmit={addTodo} />
                        <SearchInput onSubmit={handleFilterChange}></SearchInput>
                        <h1 className="font-bold text-3xl text-center my-10 text-white"> List Task </h1>
                    </>
                )}

                {isEdit && (
                    <h1 className="font-bold text-3xl text-center my-10 text-white"> Update Task </h1>
                )}
                <Todo
                    setIsEdit={setIsEdit}
                    todolists={todolists}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                />

                <div className="h-20"></div>

            </div>
        </div>
    )
}

