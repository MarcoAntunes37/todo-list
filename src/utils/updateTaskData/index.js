import axios from 'axios';

export default function updateTaskData(task){
    const options = {
        url: `https://todo-list-api-psi.vercel.app/api/lists/update/${task._id}`,
        method: 'PUT',
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*"
        },
        data: task
    }
    return axios(options)
}