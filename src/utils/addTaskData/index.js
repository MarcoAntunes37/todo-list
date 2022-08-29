import axios from 'axios';

export default function addTaskData(task){
    const options = {
        url: 'http://localhost:8090/api/lists/new',
        method: 'POST',
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*"
        },
        data: task
    }
    return axios(options)
}