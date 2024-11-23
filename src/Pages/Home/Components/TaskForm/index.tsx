import { ChangeEvent, FormEvent, useState } from 'react';
import './TaskForm.css';
import { TaskFormProps } from './TaskForm.props';
import { userService } from '../../../../services/user';
import { Task } from '../../../../Entity/task';
import useListStore from '../../../../store/useListStore';
import useUserStore from '../../../../store/useUserStore';
import { Response } from '../../../../Entity/response';
import useTaskStore from '../../../../store/useTaskStore';

const TaskForm:React.FC<TaskFormProps> = ({setDisplaynewTaskForm})=>{
    const [formData, setFormData] = useState<Partial<Task>>({})
    const {user} = useUserStore()
    const {activeItem} = useListStore()
    const {setTasks} = useTaskStore();
    const handleInputOnChange = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name, value} = event.target;
        setFormData({...formData, [name]:value})
    }
    const handleCreateTask = async(event:FormEvent<HTMLFormElement>)=>{
        try {
            event.preventDefault()
            const newTask:Task = {...formData, done:false, list_id:activeItem, user_id:user._id} as Task
            const response:Response = await userService.createTask(newTask);
            if(response.error)throw new Error(response.message);
            setDisplaynewTaskForm(false);
            const taskResponse:Response = await userService.getAllTasks(activeItem);
            if(taskResponse.error)throw new Error(taskResponse.message);
            console.log(taskResponse.message);
            const tasks:Task[] = taskResponse.data
            setTasks(tasks);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unkown error';
            console.log(errorMessage);
        }
    }
    return <form onSubmit={handleCreateTask} className='task-form'>
    <input onChange={handleInputOnChange} className='input' name='name' type="text" placeholder='Task name' />
    <textarea onChange={handleInputOnChange} className='input' name="description" placeholder='Description'></textarea>
    <div>
        <button onClick={()=>setDisplaynewTaskForm(false)}  className='btn btn--cancel'>Cancel</button>
        <input className='btn btn--primary' type="submit" value={'Accept'}/>
    </div>
</form>
}
export default TaskForm;