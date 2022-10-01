import axios from 'axios';
import Cookies from 'js-cookie'


const client = axios.create( {
    baseURL: 'https://sisis.ifandri.com/api',
} )

export const request = ( {...options},token=true ) => {
    
    if (token){
        client.defaults.headers.common.Authorization = `Bearer ${Cookies.get('accessToken')}`
        console.log('masuk token true0');
    }


    const onSuccess = response => response;
    const onError = error => {
        return error
    }

    return client(options)
}