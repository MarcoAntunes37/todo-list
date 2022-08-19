import React, {useEffect, useState, useCallback} from 'react'
import TaskItem from '../TaskItem'

export default function TodoList() {
    const url = 'https://todo-list-api-snowy.vercel.app/api/lists/'
    const [task, setTask] = useState([])
    
    
    const getAllTasks = useCallback(
      async () => {        
            const response = await fetch(url)
            const responseJSON = await response.json();
            setTask(responseJSON)
            return responseJSON
                      
      },[])

    useEffect(() => { 
        getAllTasks() 
         
    } , [getAllTasks, task])

   

  return (
    <div>
        {task.map((item) => {
            return <TaskItem item={item}/>
        })}
    </div>
  )
}
