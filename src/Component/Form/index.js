import React, {useState, useRef} from 'react'
import './form.css'

export default function Form() {    
    const url = 'https://todo-list-api-marcoantunes37.vercel.app/api/lists/new'
    const form = useRef(null)
    const title = useRef(null)
    const description = useRef(null)
    const date = useRef(null)
    const start = useRef(null)
    const end = useRef(null)
    const [task, setTask] = useState(null)


    const fortmatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    }
    
    async function newTask(){
        const taskData = {
            title: title.current.value,
            description: description.current.value,
            date: date.current.value,
            startTime: start.current.value,
            endTime: end.current.value
        }
        try{
            const res = await fetch(url, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                    
                },
                body: JSON.stringify(taskData)
            });
            if(!res.ok){
                const message = `Error occurrend: ${res.status}, ${res.statusText}`
                throw new Error(message);
            }
            const data = await res.json();
            const result = {
                status: res.status + "-" + res.statusText,
                headers: {
                    "Content-Type": res.headers.get("Content-Type"),
                    "Content-Length": res.headers.get("Content-Length"),
                  },
                  data: data                  
            }
            setTask(fortmatResponse(result))
        }
        catch(err){
            setTask(err)
        }
    }

    const clearTaskOutput = () => {
        setTask(null)
        this.form.reset()
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
        <button onClick={newTask}>Add</button>
        <button onClick={clearTaskOutput}>Clear</button>
    </form>
  )
}