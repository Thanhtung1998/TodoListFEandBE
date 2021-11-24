// import { Register } from '../features/Register';
import _ from 'lodash';
import axiosClient from './axiosClient'

const todoApi = {

    addTodo: (data: any) => {
        const url = '/v1/todo/addTodo';
        return axiosClient.post(url, data);
    },

    updateTodo: (_id: string, data: any) => {
        const url = `/v1/todo/updateTodo/${_id}`;
        return axiosClient.patch(url, data);
    },

    removeTodo: (_id: string) => {
        const url = `/v1/todo/removeTodo/${_id}`;
        return axiosClient.delete(url);
    },
    getOneTodo: (id: string) => {
        const url = `/v1/todo/${id}`;
        return axiosClient.get(url)
    },

    getAllTodo: (params: any) => {
        const url = `/v1/todo/all?_idUser=${params}`;
        return axiosClient.get(url);
    },

    completeTodo: (id: string, data: any) => {
        const url = `/v1/todo/completeTodo/${id}`;
        return axiosClient.put(url, data);
    }

}

export default todoApi;