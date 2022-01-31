import React, {useRef} from 'react'
import Style from "./LoginPage.module.scss"
import {logWithDebug} from './../utils/logHandling'

import { useDispatch } from 'react-redux'
import { verifyUser } from './../features/login/loginSlice'

import UserLogo from './../assets/images/Benutzer.svg'
import PasswordLogo from './../assets/images/Passwortschloss.svg'

const LoginPage: React.FC = () => {
    const usernameInputRef = useRef<HTMLInputElement>(null)
    const usernameInputContainerRef = useRef<HTMLDivElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const passwordInputContainerRef = useRef<HTMLDivElement>(null)

    const dispatch = useDispatch()
    const handleLoginRequest = () => {
        logWithDebug('handleLoginRequest')
        dispatch(verifyUser())
    }
    const handleRegisterRequest = () => {
        logWithDebug('handleRegisterRequest')
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
                    <button className={Style.loginButton} onClick={handleLoginRequest}>Login</button>
                    <button className={Style.registerButton} onClick={handleRegisterRequest}>Join Now</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
