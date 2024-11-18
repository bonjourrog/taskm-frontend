import { Response } from '../Entity/response';
import api from './api';

export const signin = async(email:string, password:string):Promise<Response>=>{
    try {
        const {data} = await api.post('auth/sign-in',{email, password});
        return data;
    } catch (error:any) {
        return error.response.data
    }
}
export const signup = async(user:{email:string, password:string,user_name:string}):Promise<Response>=>{
    try {
        const res = await api.post('auth/register/', user)
        return res.data
    } catch (error:any) {
        return error.response.data
    }
    
}