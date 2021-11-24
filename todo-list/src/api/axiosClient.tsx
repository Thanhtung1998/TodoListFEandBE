// api/axiosClient.js
import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs
const API = process.env.REACT_APP_API_URL
const API_PRODUCT = process.env.REACT_APP_API_PRODUCTION
// console.log(API)
const axiosClient = axios.create({
    baseURL: API_PRODUCT || API,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {

    return config;

}, function (err) {
    // Do some thing with with request error
    return Promise.reject(err);
})

axiosClient.interceptors.response.use((response: AxiosResponse) => {
    // Xử lý khi có response trả về
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});


export default axiosClient;