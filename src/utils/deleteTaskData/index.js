import axios from 'axios';

export default function deleteTaskData(task){
    const options = {
        url: `http://localhost:8090/api/lists/delete/${task}`,        
        method: 'delete',
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*"
        }
    }    
    return axios(options)
}