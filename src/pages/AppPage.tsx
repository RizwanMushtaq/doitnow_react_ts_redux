import React from 'react'
import Style from "./AppPage.module.scss"

import Header from '../components/Header'

const AppPage = () => {

    return (
        <div className={Style.container}>
            <Header></Header>
        </div>
    ) 
}

export default AppPage
