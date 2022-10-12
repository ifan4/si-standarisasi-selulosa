import axios from 'axios';
import Cookies from 'js-cookie'


const client = axios.create( {
    baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
} )

export const request = ( {...options},token=true ) => {
    
    if (token){
        client.defaults.headers.common.Authorization = `Bearer ${Cookies.get('accessToken')}`
    }


    const onSuccess = response => response;
    const onError = error => {
        return error
    }

    return client(options)
}