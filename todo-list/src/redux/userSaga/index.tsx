import { fork, take, call, put, delay, all } from 'redux-saga/effects'
import { authActions, LoginPayload } from "../userSlice";
import { PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { useHistory } from "react-router-dom"

const Api = process.env.REACT_APP_API_URL

function* handelLogin(payload: LoginPayload) {

    console.log("handelLogin");

    try {
        const user: AxiosResponse = yield call(axios.post, /*${Api}*/`v1/user/login`, payload);
        console.log(user.status);
        yield put(authActions.loginSuccess(user.data));
    } catch (err: any) {

        localStorage.removeItem('user-token');
        yield put(authActions.loginFailed(err.message));

    }
}

function* handelLogout() {
    console.log('Handel Logout')
    yield put(authActions.logout());
}

function* watchLoginFlow() {
    while (true) {


        const isFetchingIn = (localStorage.getItem('user-token'));

        const data = JSON.parse(isFetchingIn!);


        // console.log(data);

        if (!data) {
            console.log("Listening for login flow")
            const action: PayloadAction<LoginPayload> = yield take(authActions.loginStart.type);
            yield call(handelLogin, action.payload);
        }


        // đứng đợi action
        if (data) {
            console.log("Listening for logout flow")
            yield take(authActions.logout.type);
            yield fork(handelLogout);
        }

    }
    // vòng lặp lắng nghe
}


export function* userSaga() {
    yield fork(watchLoginFlow);
}