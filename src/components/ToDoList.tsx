import React, {useLayoutEffect} from 'react'
import Style from './ToDoList.module.scss'

import { logWithDebug } from '../utils/logHandling'
import plusIcon from '../assets/images/plus-svgrepo-com.svg'
import deleteIcon from '../assets/images/Papierkorb.svg'

import { RootState } from './../app/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateToDoListData } from '../features/todoList/todoListSlice'
import { format } from 'date-fns'
import axios from 'axios'
import { apiEndPoints } from '../config/apiEndPoints'

const ToDoList = () => {

    const dispatch = useDispatch()
    const selectedDate = useSelector((state: RootState) => state.calender.selectedDate)
    const selectedDateForRendering = format(selectedDate, 'dd') + '.' + 
                                     format(selectedDate, 'MM') + '.' + 
                                     format(selectedDate, 'yyyy')
    
    const todoListData = useSelector((state: RootState) => state.todoList.data)

    const handleAddTodoIconClick = () => {
        logWithDebug('handleAddTodoIconClick function')
    }
    const handleCheckboxClick = () => {
        logWithDebug('handleCheckboxClick function')
    }
    const handleDeleteIconClick = () => {
        logWithDebug('handleDeleteIconClick function')
    }

    useLayoutEffect(() => {
        let bearerToken = localStorage.getItem('BearerToken')
        const userID = localStorage.getItem('userID')
        const selectedDateFormat = format(selectedDate, 'dd') + '.' + format(selectedDate, 'MM') + '.' + format(selectedDate, 'yyyy')

        if(bearerToken){
            axios.post(
                apiEndPoints.getTodosForDateSelected,
                {
                    "userID": userID,
                    "selectedDate": selectedDateFormat
                },
                {
                    headers: {
                        'Authorization': bearerToken
                    }
                }
            )
            .then( (response) => {
                if(JSON.stringify(response.data) === JSON.stringify({})){
                    logWithDebug('data is null')
                    dispatch(updateToDoListData([]))
                } else {
                    logWithDebug('we got some data')
                    logWithDebug(response.data)
                    dispatch(updateToDoListData(response.data))
                }
            })
            .catch( (err) => {
                throw err
            })
        }
    }, [dispatch, selectedDate])

    return (
        <div className={Style.container}>
                <div className={Style.Header}>
                    <div>{selectedDateForRendering}</div>
                    <div className={Style.addToDoDiv} onClick={handleAddTodoIconClick}>
                        <img src={plusIcon} alt='plusIcon'></img>
                    </div>
                </div>
                
                <div className={Style.toDoListContainer}>
                        {
                            todoListData.length > 0 && 
                            todoListData.map( (item) => {
                                return(
                                    <div className={Style.todo_ListItem} key={item.Item_ID}>
                                        
                                        {  item.Done 
                                            ?
                                            <div className={Style.todo_checkboxDiv}>
                                                <input 
                                                    type="checkbox" 
                                                    defaultChecked 
                                                    className={Style.todoCheckboxInput} 
                                                    id={item.Item_ID}
                                                    onChange={handleCheckboxClick}
                                                />
                                            </div>
                                            :
                                            <div className={Style.todo_checkboxDiv}>
                                                <input 
                                                    type="checkbox" 
                                                    className={Style.todoCheckboxInput} 
                                                    id={item.Item_ID}
                                                    onChange={handleCheckboxClick}
                                                />
                                            </div>
                                        }

                                        {   item.Done
                                            ?
                                            <div className={Style.todo_item}>
                                                <div className={Style.todo_item_done}>{item.Todo}</div>
                                            </div>
                                            :
                                            <div className={Style.todo_item}>
                                                <div>{item.Todo}</div>
                                            </div>
                                        } 
                                        
                                        <div className={Style.todo_deleteDiv} >
                                            <img 
                                                src={deleteIcon} 
                                                alt="deleteIcon" 
                                                id={item.Item_ID}
                                                onClick={handleDeleteIconClick}
                                            />
                                        </div>
                                    </div>
                                )})
                        }

                        {
                            todoListData.length < 1 && 
                                <div>No items to display</div>
                        }
                </div>
                
            </div>
    )
}

export default ToDoList
