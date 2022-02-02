import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {apiEndPoints} from '../../config/apiEndPoints'
import { logWithDebug } from '../../utils/logHandling'

interface isLoggedInState {
    value: boolean,
    status: string,
}
const initialState: isLoggedInState = {
    value: false,
    status: 'none'
}

export interface EnteredDataLoginPage {
    enteredUsername: string,
    enteredPassword: string
}
export const verifyUser = createAsyncThunk(
    'isLoggedIn/verifyUser',
    async (enteredData: EnteredDataLoginPage) => {
        const response = axios.post(
            apiEndPoints.userLogin,
            {
                'username': enteredData.enteredUsername,
                'password': enteredData.enteredPassword
            }
        )
        return response
    }
)

export const loginSlice = createSlice({
    name: 'isLoggedIn',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.value = false
            state.status = 'none'
        }
    },
    extraReducers: (builder) => {
        builder.addCase(verifyUser.fulfilled, (state, action) => {
            const bearerToken = 'Bearer ' + action.payload.data.accessToken
            localStorage.setItem("BearerToken", bearerToken)
            localStorage.setItem("userName", action.payload.data.userName)
            localStorage.setItem("userID", action.payload.data.userID)
            localStorage.setItem("userEMail", action.payload.data.userEMail)
            state.value = true
            state.status = 'success'
        })
        builder.addCase(verifyUser.pending, (state, action) => {
            state.value = false
            state.status = 'verifying'
        })
        builder.addCase(verifyUser.rejected, (state, action) => {
            state.value = false
            state.status = 'failed';
            logWithDebug(action)
            if(action.error.message === 'Network Error'){
                alert(action.error.message)
            }else {
                alert('Incorrect username or password')
            }
        })
    }
})

export const { logoutUser } = loginSlice.actions
export default loginSlice.reducer
