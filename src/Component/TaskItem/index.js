import React, {useState, useRef} from 'react'
import './taskitem.css'

export default function TaskItem(props) {
    const url = 'https://todo-list-367yrruj2-marcoantunes37.vercel.app/api/lists/'
    const [toggle, setToggle] = useState(true)
    const {_id, title, description, startTime, endTime, done} = props.item
    const [changes, setChanges] = useState([])
    const date = new Date(props.item.date)
    const refTitle = useRef(null)
    const refDescr = useRef(null)
    const refDate = useRef(null)
    const refStart = useRef(null)
    const refEnd = useRef(null)
    const refDone = useRef(null)

    const handleChange = (e) => {        
        setChanges(prevState => {
            return {...prevState, done: refDone.current.checked }
        })
    }

    const handleBlur = (e) => {
        const taskData = {
            title: refTitle.current.value,
            description: refDescr.current.value,
            date: refDate.current.value,
            startTime: refStart.current.value,
            endTime: refEnd.current.value,
            done: refDone.current.checked
        }
        setChanges(taskData)
    }

    const fortmatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    }

    const handleDelete = async (id) => {
        try{
            const res = await fetch(`${url}/delete/${id}`, {
                method: 'delete',
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value"
                }
            })
            if(!res.ok){
                const message = `Error occurrend: ${res.status}, ${res.statusText}`
                throw new Error(message);
            }
        }
        catch(err){
            throw new Error(err)
        }
    }
    
    const handleSave = async (id) => {
        setToggle(true)
        try{
            const res = await fetch(`${url}/update/${id}`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value"
                },
                body: JSON.stringify(changes)
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
            setChanges(fortmatResponse(result))
        }
        catch(err){
            setChanges(err)
        }
    }
    
    return (
        <div className='todo-list'>
            <div className='item-content' key={_id} >                             
                {done ? 
                (<input 
                    className='item-done'
                    type='checkbox' 
                    ref={refDone} 
                    defaultChecked 
                    onChange={(e) => handleChange(e)}
                /> )
                : (<input 
                    ref={refDone} 
                    className='item-done'
                    type='checkbox' 
                    onChange={(e) => handleChange(e)} 
                />)}
                {toggle ? 
                (<div 
                    className='item-title' 
                    onDoubleClick={() => setToggle(false)}>
                        {title}
                </div>) : 
                (<input 
                    className='item-title' 
                    type="text" 
                    defaultValue={title} 
                    ref={refTitle} 
                    onBlur={(e) => handleBlur(e)}
                />)}
                {toggle ? 
                (<div 
                    className='item-description' 
                    onDoubleClick={() => setToggle(false)}>
                        {description}
                </div>) : 
                (<input 
                    className='item-description' 
                    type="text" 
                    defaultValue={description} 
                    ref={refDescr}  
                    onBlur={(e) => handleBlur(e)}
                />)}
                {toggle ? 
                (<div 
                    className='item-date' 
                    onDoubleClick={() => setToggle(false)}>
                        {date.toISOString().split('T', 1)}
                </div>) : 
                (<input 
                    className='item-date' 
                    type="date" 
                    defaultValue={date.toISOString().split('T', 1)} 
                    ref={refDate} 
                    onBlur={(e) => handleBlur(e)} 
                />)}
                {toggle ? 
                (<div 
                    className='item-start' 
                    onDoubleClick={() => setToggle(false)}>
                        {startTime}
                </div>) : 
                (<input 
                    className='item-start' 
                    type="time" 
                    defaultValue={startTime} 
                    ref={refStart} onBlur={(e) => handleBlur(e)} 
                />)}
                {toggle ? 
                (<div 
                    className='item-end' 
                    onDoubleClick={() => setToggle(false)}>
                        {endTime}
                </div>) : 
                (<input 
                    className='item-end' 
                    type="time" 
                    defaultValue={endTime} 
                    ref={refEnd} 
                    onBlur={(e) => handleBlur(e)}
                />)}
                <div className='item-buttons'>
                    <button 
                    className='button-delete'
                    onClick={() => handleDelete(_id)}>
                        Delete
                    </button>
                    <button 
                    className='button-save'
                    onClick={() => handleSave(props.item)}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
