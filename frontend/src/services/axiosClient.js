import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL : process.env.API_URL,
    headers : {
        'content-type' : 'application/json'
    },
    paramsSerializer : params => queryString.stringify(params)
})
axiosClient.interceptors.response.use((res) =>{
    if(res.data || res){
        return res.data
    }
})

export default axiosClient;