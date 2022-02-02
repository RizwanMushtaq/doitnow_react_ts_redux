import React, {useRef} from 'react'
import Style from "./LoginPage.module.scss"
import {logWithDebug} from './../utils/logHandling'

import { useDispatch, useSelector } from 'react-redux'
import { verifyUser, EnteredDataLoginPage } from './../features/login/loginSlice'
import { resetCalender } from './../features/calender/calenderSlice'
import { RootState } from '../app/store'

import UserLogo from './../assets/images/Benutzer.svg'
import PasswordLogo from './../assets/images/Passwortschloss.svg'
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
    const usernameInputRef = useRef<HTMLInputElement>(null)
    const usernameInputContainerRef = useRef<HTMLDivElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const passwordInputContainerRef = useRef<HTMLDivElement>(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLoginRequest = async () => {
        logWithDebug('handleLoginRequest')
        isInputEmpty()
        const enteredData = getInputData()
        let loginResult: any = await dispatch(verifyUser(enteredData))
        logWithDebug(loginResult)
        if(loginResult.payload.status === 200){
            dispatch(resetCalender())
            navigate('/app')
        }
    }
    const isInputEmpty = () => {
        if(usernameInputRef.current!.value.trim() === ""){
            usernameInputContainerRef.current!.style.border = '2px solid red'
            const error = new Error('Username field is empty')
            throw error
        }
        if(usernameInputRef.current!.value.trim() !== ""){
            usernameInputContainerRef.current!.style.border = '1px solid black'
        }
        if(passwordInputRef.current!.value.trim() === ""){
            passwordInputContainerRef.current!.style.border = '2px solid red'
            const error = new Error('Password field is empty')
            throw error
        }
        if(passwordInputRef.current!.value.trim() !== ""){
            passwordInputContainerRef.current!.style.border = '1px solid black'
        }
        return true
    }
    const getInputData = ():EnteredDataLoginPage => {
        const username = usernameInputRef.current!.value
        const password = passwordInputRef.current!.value

        return {
            enteredUsername: username,
            enteredPassword: password
        }
    }

    const handleRegisterRequest = () => {
        logWithDebug('handleRegisterRequest')
        navigate('/registration')
    }


    const logInStatus = useSelector((state: RootState) => state.login.status)
    let logInButton = null
    if(logInStatus === 'verifying'){
        logInButton = <button className={Style.loginButton}>Verification In-Progress</button>
    } else {
        logInButton = <button className={Style.loginButton} onClick={handleLoginRequest}>Login</button>
    }

    return (
        <div className={Style.container}>
            <div className={Style.titleContainer}>
                <h1>Do It Now App</h1>
            </div>
            <div className={Style.formContainer}>
                <div className={Style.InputContainer}>
                    <div className={Style.InputContainerInner} ref={usernameInputContainerRef}>
                        <div>
                            <img src={UserLogo} alt='UserLogo'></img>
                        </div>
                        <input type='text' id='LoginFormUserInput' placeholder='username' ref={usernameInputRef}></input>
                    </div>
                    <div className={Style.InputContainerInner} ref={passwordInputContainerRef}>
                        <div>
                            <img src={PasswordLogo} alt='PasswordLogo'></img>
                        </div>
                        <input type='password' id='LoginFormPasswordInput' placeholder='password' ref={passwordInputRef}></input>
                    </div>
                    <p className={Style.forgotPasswordLabel} >Forgot password?</p>
                </div>
                <div className={Style.buttonContainer}>
                    {logInButton}
                    <button className={Style.registerButton} onClick={handleRegisterRequest}>Join Now</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
