import axios from 'axios';

export default async function addTaskData(task){
    const options = {
        url: 'https://todo-list-api-psi.vercel.app/api/lists/new',
        method: 'POST',
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*"
        },
        data: task
    }
    return await axios(options)
}