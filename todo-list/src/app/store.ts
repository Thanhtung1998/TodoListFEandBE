import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga';
import { authReducer } from '../redux/userSlice';
import rootSaga from './rootSaga';
import { TodoReducer } from '../redux/todoSlice'


const rootReducer = {
  user: authReducer,
  todoList: TodoReducer,
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, sagaMiddleware),
  reducer: rootReducer
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

