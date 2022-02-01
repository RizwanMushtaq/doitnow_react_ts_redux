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
}

const initialState: todoListState = {
    data: []
}

export const todoListSlice = createSlice({
    name: 'todoListState',
    initialState,
    reducers: {
        updateToDoListData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { updateToDoListData } = todoListSlice.actions
export default todoListSlice.reducer