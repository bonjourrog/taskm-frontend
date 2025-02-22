import { Response } from '../Entity/response';
import { List } from '../Entity/list';
import api from './api';
import { Task } from '../Entity/task';

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
const updateList = async(list_id:string, list:List):Promise<Response>=>{
    try {
        const token: string = localStorage.getItem("authToken") as string;
        const {data} = await api.put(`list/${list_id}`, list, {headers:{Authorization:token}})
        return data
    } catch (error:any) {
        return error.response.data
    }
}
const createTask = async(task:Task):Promise<Response>=>{
    try {
        const token: string = localStorage.getItem("authToken") as string;
        const {data} = await api.post('task/',task,{headers:{Authorization:token}})
        return data
    } catch (error:any) {
        return error.response.data
    }
}
const getAllTasks = async(list_id: string):Promise<Response>=>{
    try {
        const token: string = localStorage.getItem("authToken") as string;
        const {data} = await api.get(`task/${list_id}`, {headers:{Authorization:token}})
        return data;
    } catch (error:any) {
        return error.response.data
    }
}
const updateTask = async(task_id: string, task:Task):Promise<Response>=>{
    try {
        const token: string = localStorage.getItem("authToken") as string;
        const {data} = await api.put(`task/${task_id}`, task, {headers:{Authorization:token}})
        return data;
    } catch (error:any) {
        return error.response.data
    }
}
const deleteTask = async(task_id: string):Promise<Response>=>{
    try {
        const token: string = localStorage.getItem("authToken") as string;
        const {data} = await api.delete(`task/${task_id}`,{headers:{Authorization:token}});
        return data;
    } catch (error:any) {
        return error.response.data;
    }
}

export const  userService = {
    createList,
    getAll,
    deleteList,
    updateList,
    createTask,
    getAllTasks,
    updateTask,
    deleteTask
}