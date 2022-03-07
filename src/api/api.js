import axios from 'axios'

export const getAxiosInstance=()=>{
    return axios.create({
        baseURL:"https://course-api.com/",
        headers:{
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "application/json; charset=UTF-8"
        }
    });

}
