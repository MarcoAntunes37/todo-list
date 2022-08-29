import axios from 'axios';

export default function updateTaskData(task){
    const options = {
        url: `http://localhost:8090/api/lists/update/${task._id}`,
        method: 'PUT',
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*"
        },
        data: task
    }
    return axios(options)
}