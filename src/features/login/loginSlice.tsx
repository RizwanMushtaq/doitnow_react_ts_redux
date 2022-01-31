import { createSlice } from '@reduxjs/toolkit'

interface isLoggedInState {
    value: boolean
}

const initialState: isLoggedInState = {
    value: false
}

export const loginSlice = createSlice({
    name: 'isLoggedIn',
    initialState,
    reducers: {
        verifyUser: (state) => {
            state.value = true
        },
        logoutUser: (state) => {
            state.value = false
        }
    }
})

export const { verifyUser, logoutUser } = loginSlice.actions

export default loginSlice.reducer
