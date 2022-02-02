import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

import loginReducer from '../features/login/loginSlice'
import calenderReducer from '../features/calender/calenderSlice';
import todoListReducer from '../features/todoList/todoListSlice';
import addToDoItemDialogReducer from '../features/addToDoItemDialog/addToDoItemDialogSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    calender: calenderReducer,
    todoList: todoListReducer,
    addToDoItemDialog: addToDoItemDialogReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
