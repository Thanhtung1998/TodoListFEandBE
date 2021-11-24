import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface UserState {
    todoLists: any,
    filteredTodo: any,
    error: boolean
}

const initialState: UserState = {
    todoLists: JSON.parse(localStorage.getItem("todoList")!) || null,
    filteredTodo: JSON.parse(localStorage.getItem("todoList")!) || null,
    error: false,
}

const TodoSlice = createSlice({
    name: "todoList",
    initialState,
    reducers: {
        addLocalStorage(state, action: PayloadAction<any>) {
            state.todoLists = action.payload;
            localStorage.setItem('todoList', JSON.stringify(action.payload));
            state.error = false;
            state.filteredTodo = action.payload
        },

        addOneTask(state, action: PayloadAction<any>) {
            state.todoLists = JSON.parse(localStorage.getItem("todoList")!)
            const newArray = [...state.todoLists, action.payload]
            localStorage.setItem('todoList', JSON.stringify(newArray));
            state.filteredTodo = newArray
        },
        updateLocalStorage(state, action: PayloadAction<any>) {
            state.todoLists = JSON.parse(localStorage.getItem("todoList")!)
            let data = state.todoLists.filter((item: any) => { return item._id === action.payload._id })
            data = action.payload.data
            const newArray = [{ _id: action.payload._id, ...data }, ...state.todoLists.filter((item: any) => { return item._id !== action.payload._id })]
            localStorage.setItem('todoList', JSON.stringify(newArray));
            state.filteredTodo = newArray
        },
        removeLocalStorage(state, action: PayloadAction<any>) {
            state.todoLists = JSON.parse(localStorage.getItem("todoList")!)
            const newArray = state.todoLists.filter((item: any) => { return item._id !== action.payload })
            localStorage.setItem('todoList', JSON.stringify(newArray));
            state.filteredTodo = newArray
        },

        completeTask(state, action: PayloadAction<any>) {
            state.todoLists = JSON.parse(localStorage.getItem("todoList")!)
            let data = state.todoLists.filter((item: any) => { return item._id === action.payload._id })
            data = [action.payload.data]
            const newArray = [{ _id: action.payload._id, ...action.payload.data }, ...state.todoLists.filter((item: any) => { return item._id !== action.payload._id })]
            localStorage.setItem('todoList', JSON.stringify(newArray));
            state.filteredTodo = newArray
        },
        searchTask(state, action: PayloadAction<any>) {
            state.todoLists = JSON.parse(localStorage.getItem("todoList")!)
            let data = state.todoLists.filter((item: any) => { return item.title.includes(action.payload) })
            state.filteredTodo = data
        }

    },
})


// Actions
export const todoActions = TodoSlice.actions;

// Selector

export const selectFilteredTodo = (state: any) => state.todoList.filteredTodo;

// Reducers
export const TodoReducer = TodoSlice.reducer;

