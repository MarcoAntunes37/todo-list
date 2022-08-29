import React from 'react'
import TaskItem from '../TaskItem'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

export default function TodoList() {
    const options = {
      url: 'https://todo-list-api-psi.vercel.app/api/lists',
      method: 'GET',
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*"
      }
    }
    const {isLoading, error, data} = useQuery(['todo'], () => axios(options)
    .then((response) => {
      return response
    }))

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data
        .data
        ?.map(item => {
          return (
              <TaskItem 
                item={item}
                key={item._id}
              />
            )
          })    
      }
    </div>
  )
}
