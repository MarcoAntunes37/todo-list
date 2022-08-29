import React, {useRef} from 'react'
import addTaskData from '../../utils/addTaskData';
import {useMutation, useQueryClient} from '@tanstack/react-query'
import './form.css'

const useAddTaskData = () => {   
    const queryClient = useQueryClient();

    return useMutation(addTaskData, {
        onSuccess: () => {
            queryClient.invalidateQueries(["todo"])
        },
        onError: (err) =>{
            alert(err)
        }
    })
}


export default function Form() {
    const form = useRef(null)
    const title = useRef(null)
    const description = useRef(null)
    const date = useRef(null)
    const start = useRef(null)
    const end = useRef(null)
    const { mutate: addTask } = useAddTaskData()

    const handleAddClick = () => {
        const task = {
            title: title.current.value,
            description: description.current.value,
            date: date.current.value,
            startTime: start.current.value,
            endTime: end.current.value
        }
        addTask(task)
    }

    return (
        <form className='form' ref={form}>
            <div className='form-item'>
                <p>Title</p>
                <input ref={title} type='text' placeholder='Title'/>
            </div>
            <div className='form-item'>
                <p>Description</p>
                <input ref={description} type='text' placeholder='Description'/>
            </div>
            <div className='form-item'>
                <p>Date</p>
                <input ref={date} type='date'/>
            </div>
            <div className='form-item'>
                <p>Start time</p>
                <input ref={start} type='time'/>
            </div>
            <div className='form-item'>
                <p>End time</p>
                <input ref={end} type='time'/>
            </div>
            <div className='form-button'>
                <button type="submit" onClick={handleAddClick}>Add</button>
                <button type='reset'>Clear</button>
            </div>        
        </form>
    )
}