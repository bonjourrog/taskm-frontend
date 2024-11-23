import {create} from 'zustand';
import { Task } from '../Entity/task';

interface TaskState{
    tasks: Task[];
    setTasks:(tasks: Task[])=>void;
}

const useTaskStore = create<TaskState>(set=>({
    tasks:[],
    setTasks:(tasks:Task[])=>set({tasks})
}))
export default useTaskStore;