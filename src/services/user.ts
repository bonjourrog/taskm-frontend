import { Response } from '../Entity/response';
import { List } from '../Entity/list';
import api from './api';

const createList = async(list:Partial<List>, user_id:string):Promise<Response>=>{
    try {
        const token: string = localStorage.getItem("authToken") as string;
        const {data} = await api.post('/list',{name:list.name, color:list.color, user_id:user_id},{headers:{Authorization:`${token}`}});
        return data;
    } catch (error:any) {
        return error.response.data
    }
}
const getAll = async(user_id:string):Promise<Response>=>{
    try {
        const token: string = localStorage.getItem("authToken") as string;
        const {data} = await api.get(`/list/${user_id}`, {headers:{Authorization:token}});
        return data
    } catch (error:any) {
        return error.response.data
    }
}
const deleteList = async(list_id:string):Promise<Response>=>{
    try {
        const token: string = localStorage.getItem("authToken") as string;
        const {data} = await api.delete(`list/${list_id}`,{headers:{Authorization:token}});
        return data;
    } catch (error:any) {
        return error.response.data
    }
}

export const  userService = {
    createList,
    getAll,
    deleteList
}