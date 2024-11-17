import { Response } from '../Entity/response';
import api from './api';

export const signin = async(email:string, password:string):Promise<Response|null>=>{
    const {data} = await api.post('auth/sign-in',{email, password});
    return data;
}