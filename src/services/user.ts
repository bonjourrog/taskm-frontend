import { Response } from '../Entity/response';
import { List } from '../Entity/list';
import api from './api';

const createList = async(list:Partial<List>, user_id:string):Promise<Response>=>{
    const token: string = localStorage.getItem("authToken") as string;
    const {data} = await api.post('/list',{name:list.name, color:list.color, user_id:user_id},{headers:{Authorization:`${token}`}});
    return data;
}

export const  userService = {
    createList
}