import { createSlice } from '@reduxjs/toolkit'
import {addMonths, subMonths} from 'date-fns'

interface calenderState {
    todayDate: Date,
    selectedDate: Date,
    calenderDate: Date,
    dateListWithToDos: Date[],
    updateDateListWithToDos: boolean,
}
const initialState: calenderState = {
    todayDate: new Date(),
    selectedDate: new Date(),
    calenderDate: new Date(),
    dateListWithToDos: [],
    updateDateListWithToDos: false,
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
        updateDateListWithToDos: (state, action) => {
            state.dateListWithToDos = action.payload
        },
        updateCalenderIfRequired: (state, action) => {
            console.log(action.payload)
            let isRequired = !(state.dateListWithToDos.includes(action.payload))
            if(isRequired){
                state.updateDateListWithToDos = !state.updateDateListWithToDos
            }
        }
    }
})

export const { updateSelectedDate, 
               showNextMonth, 
               showPreviousMonth, 
               updateDateListWithToDos,
               updateCalenderIfRequired,
             } = calenderSlice.actions
export default calenderSlice.reducer