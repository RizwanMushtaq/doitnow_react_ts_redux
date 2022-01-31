import React from 'react';
import Style from './Header.module.scss'
import {logWithDebug} from './../utils/logHandling'

import { useDispatch } from 'react-redux'
import { logoutUser } from '../features/login/loginSlice'

const Header: React.FC = () => {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        logWithDebug('logoutHandler')
        dispatch(logoutUser())
    } 

    return (
        <div className={Style.container}>
            <div className={Style.welcomeDiv}>Welcome</div>
            <div className={Style.logoutDiv}> 
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
}

export default Header
