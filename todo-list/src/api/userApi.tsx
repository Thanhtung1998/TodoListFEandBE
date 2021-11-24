// import { Register } from '../features/Register';
import axiosClient from './axiosClient'

const userApi = {

    Login: (params: any) => {
        const url = '/user/login';
        return axiosClient.post(url, params);
    },

    Register: (params: any) => {
        const url = '/user/register';
        return axiosClient.post(url, params);
    },

}

export default userApi;