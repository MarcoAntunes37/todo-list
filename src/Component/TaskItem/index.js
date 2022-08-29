import React, {useState, useRef} from 'react'
import updateTaskData from '../../utils/updateTaskData'
import deleteTaskData from '../../utils/deleteTaskData'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import './taskitem.css'

const useUpdateTaskData = () => {    
    const queryClient = useQueryClient()
    return useMutation(updateTaskData, {
        onSuccess: () => {
            queryClient.invalidateQueries(["todo"])
        },
        onError: (err) =>{
            alert(err)
        }
    })
}

const useDeleteTaskData = () => {    
    const queryClient = useQueryClient()
    return useMutation(deleteTaskData, {
        onSuccess: () => {
            queryClient.invalidateQueries(["todo"])
        },
        onError: (err) =>{
            alert(err)
        }
    })
}

export default function TaskItem(props) {
    const [toggle, setToggle] = useState(true)
    const {_id, title, description, startTime, endTime, done} = props.item
    const date = new Date(props.item.date)
    const refTitle = useRef(null)
    const refDescr = useRef(null)
    const refDate = useRef(null)
    const refStart = useRef(null)
    const refEnd = useRef(null)
    const refDone = useRef(null)
    const { mutate: updTask } = useUpdateTaskData()
    const { mutate: delTask } = useDeleteTaskData()

    const handleSaveClick = () => {
        const task = {
            _id: _id,
            title: refTitle.current?.value,
            done: refDone.current?.checked,
            description: refDescr.current?.value,
            date: refDate.current?.value,
            startTime: refStart.current?.value,
            endTime: refEnd.current?.value
        }
        updTask(task)
        setToggle(true)
    }
    const handleDeleteClick = () => {
        delTask(_id)
    }

    return (
        <div className='todo-list'>
            <div className='item-content' >                             
                {done ? 
                (<input key={"item-done"+_id}
                    className='item-done'
                    type='checkbox' 
                    ref={refDone} 
                    defaultChecked 
                    
                />)
                : (<input key={"item-done"+_id}
                    ref={refDone} 
                    className='item-done'
                    type='checkbox' 
                     
                />)}
                {toggle ? 
                (<div key={"item-title"+_id}
                    className='item-title' 
                    onDoubleClick={() => setToggle(false)}
                >
                    {title}
                </div>) : 
                (<input key={"item-title"+_id}
                    className='item-title' 
                    type="text" 
                    defaultValue={title} 
                    ref={refTitle}                    
                    
                />)}
                {toggle ? 
                (<div key={"item-description"+_id}
                    className='item-description' 
                    onDoubleClick={() => setToggle(false)}
                >
                    {description}
                </div>) : 
                (<input key={"item-description"+_id}
                    className='item-description' 
                    type="text" 
                    defaultValue={description} 
                    ref={refDescr}
                />)}
                {toggle ? 
                (<div key={"item-date"+_id}
                    className='item-date' 
                    onDoubleClick={() => setToggle(false)}
                >
                    {date.toISOString().split('T', 1)}
                </div>) : 
                (<input key={"item-date"+_id}
                    className='item-date' 
                    type="date" 
                    defaultValue={date.toISOString().split('T', 1)}
                    ref={refDate}
                />)}
                {toggle ? 
                (<div key={"item-start"+_id}
                    className='item-start' 
                    onDoubleClick={() => setToggle(false)}
                >
                    {startTime}
                </div>) : 
                (<input key={"item-start"+_id}
                    className='item-start' 
                    type="time" 
                    defaultValue={startTime} 
                    ref={refStart} 
                />)}
                {toggle ? 
                (<div key={"item-end"+_id}
                    className='item-end' 
                    onDoubleClick={() => setToggle(false)}
                >
                    {endTime}
                </div>) : 
                (<input key={"item-end"+_id}
                    className='item-end' 
                    type="time" 
                    defaultValue={endTime} 
                    ref={refEnd}                    
                />)}
                <div className='item-buttons'>
                    <button key={"button-delete"+_id}
                        className='button-delete'
                        onClick={handleDeleteClick}
                    >
                        Delete
                    </button>
                    <button key={"button-save"+_id}
                        className='button-save'
                        onClick={handleSaveClick}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
