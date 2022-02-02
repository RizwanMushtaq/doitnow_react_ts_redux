import React, {useRef} from 'react';
import Style from './AddToDoItemDialog.module.scss'

import { RootState } from '../app/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateState } from '../features/addToDoItemDialog/addToDoItemDialogSlice'
import { updateToDoListMethod } from '../features/todoList/todoListSlice'
import { updateCalenderIfRequired } from '../features/calender/calenderSlice'
import { format } from 'date-fns';
import { logWithDebug } from '../utils/logHandling';
import axios from 'axios';
import { apiEndPoints } from '../config/apiEndPoints';

const AddToDoItemDialog = () => {

    const dispatch = useDispatch()
    const selectedDate = useSelector((state: RootState) => state.calender.selectedDate)
    const selectedDateForRendering = format(selectedDate, 'dd') + '.' + 
                                     format(selectedDate, 'MM') + '.' + 
                                     format(selectedDate, 'yyyy')
    const toDoTextAreaRef = useRef<HTMLTextAreaElement>(null)

    const handleCancelButtonClick = () => {
        logWithDebug('handleCancelButtonClick function')
        dispatch(updateState(false))
    }
    const handleSaveButtonClick = () => {
        logWithDebug('handleSaveButtonClick function')

        const bearerToken = localStorage.getItem('BearerToken')
        const userID = localStorage.getItem('userID')
        const toDoItem = toDoTextAreaRef.current!.value
        const selectedDateForToDo = format(selectedDate, 'dd') + '.' + format(selectedDate, 'MM') + '.' + format(selectedDate, 'yyyy')
        const done = false

        if(!toDoItem.trim().length){
            alert('There is no todo item entered')
            return
        }

        if(bearerToken){
            axios.post(
                apiEndPoints.writeTodoItem,
                {
                    "userID": userID,
                    "toDoItem": toDoItem,
                    "selectedDate": selectedDateForToDo,
                    "done": done
                },
                {
                    headers: {
                        'Authorization': bearerToken
                    }
                }
            )
            .then( (response) => {
                logWithDebug(response)
                dispatch(updateToDoListMethod())
                dispatch(updateCalenderIfRequired(selectedDate))
                dispatch(updateState(false))
            })
            .catch( (error) => {
                throw error
            })
        }
    }
    
    return (
        <div className={Style.container}>
            <div></div>
            <div className={Style.dialogBox}>
                <div className={Style.dateLabel}>{selectedDateForRendering}</div>
                <textarea 
                    className={Style.textArea} 
                    ref={toDoTextAreaRef}
                    id='toDoTextArea' 
                    placeholder="Write your Todo Item.."
                />
                <div className={Style.buttonContainer}>
                    <button onClick={handleCancelButtonClick}>Cancel</button>
                    <button onClick={handleSaveButtonClick}>Save</button>
                </div>
            </div> 
        </div>
    )
}

export default AddToDoItemDialog
