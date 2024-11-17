import api from './api';

interface Auth{
    data:string;
    error:boolean;
    message:string;
}

export const signin = async(email:string, password:string):Promise<Auth|null>=>{
    const {data} = await api.post('auth/sign-in',{email, password});
    return data;
}