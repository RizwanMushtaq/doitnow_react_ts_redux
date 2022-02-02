import { createSlice } from '@reduxjs/toolkit'

interface addToDoItemDialogState {
    isDialogVisible: boolean
}
const initialState: addToDoItemDialogState = {
    isDialogVisible: false
}

export const addToDoItemDialogSlice = createSlice({
    name: 'addToDoItemDialogState',
    initialState,
    reducers: {
        updateState: (state, action) => {
            state.isDialogVisible = action.payload
        }
    }
})

export const { updateState } = addToDoItemDialogSlice.actions
export default addToDoItemDialogSlice.reducer