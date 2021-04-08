import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL : 'https://theanhbui-ecommerce.herokuapp.com/api/v1',
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