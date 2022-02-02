import { createSlice } from '@reduxjs/toolkit'

interface ToDoListData {
    Item_ID: any
    B_ID: number
    Todo: string
    Date: string
    Done: string
}

interface todoListState {
    data: ToDoListData[],
    updateToDoList: boolean,
}

const initialState: todoListState = {
    data: [],
    updateToDoList: false,
}

export const todoListSlice = createSlice({
    name: 'todoListState',
    initialState,
    reducers: {
        updateToDoListData: (state, action) => {
            state.data = action.payload
        },
        updateToDoListMethod: (state) => {
            state.updateToDoList = !state.updateToDoList
        }
    }
})

export const { updateToDoListData, updateToDoListMethod } = todoListSlice.actions
export default todoListSlice.reducer