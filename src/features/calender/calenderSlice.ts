import { createSlice } from '@reduxjs/toolkit'
import {addMonths, subMonths} from 'date-fns'

interface calenderState {
    todayDate: Date,
    selectedDate: Date,
    calenderDate: Date,
}
const initialState: calenderState = {
    todayDate: new Date(),
    selectedDate: new Date(),
    calenderDate: new Date()
}

export const calenderSlice = createSlice({
    name: 'calenderState',
    initialState,
    reducers: {
        updateSelectedDate: (state, action) => {
            state.selectedDate = action.payload
        },
        showNextMonth: (state) => {
            state.calenderDate = addMonths(state.calenderDate, 1)
        },
        showPreviousMonth: (state) => {
            state.calenderDate = subMonths(state.calenderDate, 1)
        },
    }
})

export const { updateSelectedDate, showNextMonth, showPreviousMonth } = calenderSlice.actions
export default calenderSlice.reducer