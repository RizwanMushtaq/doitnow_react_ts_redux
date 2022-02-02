import React, {useRef} from 'react'
import Style from './RegistrationPage.module.scss'
import { logWithDebug } from '../utils/logHandling'
import {apiEndPoints} from '../config/apiEndPoints'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import UserLogo from './../assets/images/Benutzer.svg'
import PasswordLogo from './../assets/images/Passwortschloss.svg'
import MailLogo from './../assets/images/Mail.svg'

interface RegistrationFormEnteredData {
    enteredUsername: string,
    enteredEmail: string,
    enteredPassword: string
}

const RegistrationPage: React.FC = () => {

    logWithDebug('In RegistrationPage Component')

    const usernameInputRef = useRef<HTMLInputElement>(null)
    const usernameInputContainerRef = useRef<HTMLDivElement>(null)
    const emailInputRef = useRef<HTMLInputElement>(null)
    const emailInputContainerRef = useRef<HTMLDivElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const passwordInputContainerRef = useRef<HTMLDivElement>(null)

    const navigate = useNavigate()

    const handleRegistrationRequest = () => {
        try {
            isInputEmpty()
            const enteredData = getInputData()
            doUserRegistration(enteredData)
            //Add spining wheel here
        } catch (error) {
            throw error
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
        if(emailInputRef.current!.value.trim() === ""){
            emailInputContainerRef.current!.style.border = '2px solid red'
            const error = new Error('Email field is empty')
            throw error
        }
        if(emailInputRef.current!.value.trim() !== ""){
            emailInputContainerRef.current!.style.border = '1px solid black'
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
    const getInputData = ():RegistrationFormEnteredData => {
        const username = usernameInputRef.current!.value
        const email = emailInputRef.current!.value
        const password = passwordInputRef.current!.value

        return {
            enteredUsername: username,
            enteredEmail: email,
            enteredPassword: password
        }
    }
    const doUserRegistration = (enteredData: RegistrationFormEnteredData) => {
        registerUser(enteredData).then( response => {
            if(response.status === 200){
                if (response.data.result === 'success'){
                    alert('User Registration Successful')
                    usernameInputRef.current!.value = ''
                    emailInputRef.current!.value = ''
                    passwordInputRef.current!.value = ''
                } else if (response.data.result === 'duplicate'){
                    alert('User Name Not Available')
                }
            }
        }).catch( error => {
            throw error
        })
    }
    const registerUser = async (enteredData: RegistrationFormEnteredData) => {
        return await axios.post(
            apiEndPoints.userRegistration,
            {
                "username":enteredData.enteredUsername,
                "email":enteredData.enteredEmail,
                "password":enteredData.enteredPassword
            }
        )
    }

    const handleBackToLoginRequest = () => {
        navigate('/login')
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
                        <input type='text' placeholder='username' ref={usernameInputRef}></input>
                    </div>
                    <div className={Style.InputContainerInner} ref={emailInputContainerRef}>
                        <div>
                            <img src={MailLogo} alt='UserLogo'></img>
                        </div>
                        <input type='text' placeholder='email' ref={emailInputRef}></input>
                    </div>
                    <div className={Style.InputContainerInner} ref={passwordInputContainerRef}>
                        <div>
                            <img src={PasswordLogo} alt='PasswordLogo'></img>
                        </div>
                        <input type='password' id='LoginFormPasswordInput' placeholder='password' ref={passwordInputRef}></input>
                    </div>
                </div>
                <div className={Style.buttonContainer}>
                    <button className={Style.loginButton} onClick={handleRegistrationRequest}>Register</button>
                    <button className={Style.registerButton} onClick={handleBackToLoginRequest}>Back to login</button>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage
