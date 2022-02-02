import React from 'react'
import Style from "./AppPage.module.scss"

import Header from '../components/Header'
import Calender from '../components/Calender'
import ToDoList from '../components/ToDoList'
import Footer from '../components/Footer'
import AddToDoItemDialog from '../components/AddToDoItemDialog'

import { RootState } from '../app/store'
import { useSelector } from 'react-redux'

const AppPage = () => {

    const showAddToDoItemDialog = useSelector((state: RootState) => state.addToDoItemDialog.isDialogVisible)

    return (
        <div className={Style.container}>
            <div className={Style.header}>
                <Header />
            </div>
            <div className={Style.body}>
                <div className={Style.calender}>
                    <Calender />
                </div>
                <div className={Style.todoList}>
                    <ToDoList />
                </div> 
            </div>
            <div className={Style.footer}>
                <Footer />
            </div>

            {
                showAddToDoItemDialog && 
                    <AddToDoItemDialog />
            }

        </div>
    ) 
}

export default AppPage
