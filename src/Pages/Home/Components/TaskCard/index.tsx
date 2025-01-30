import './TaskCard.css';
import { FaRegNoteSticky } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { TaskCardProps } from './TaskCard.props';
import { FaCheck } from "react-icons/fa";
import { userService } from '../../../../services/user';
import { Task } from '../../../../Entity/task';
import useTaskStore from '../../../../store/useTaskStore';
import useListStore from '../../../../store/useListStore';
import { FocusEvent, useEffect, useState } from 'react';

const TaskCard: React.FC<TaskCardProps> = ({task})=>{
    const {setTasks, tasks} = useTaskStore();
    const {activeItem} = useListStore();
    const [editTask, setEditTask] = useState<boolean>(false);
    const [editTaskDesc, setEditTaskDesc] = useState<boolean>(false);
    const [showDescription, setShowDescription] = useState<boolean>(false);
    const [taskDesc, setTaskDesc] = useState<string>(task.description)
    const [taskName, setTaskName] = useState<string>("");
    const handleTaskUpdate = async(_task:Task)=>{
        try {
            const response = await userService.updateTask(_task._id, _task)
            if(response.error)throw new Error(response.message);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unkown error';
            console.log('error', errorMessage);
        }
    }
    const handleTaskDelete = async(task_id: string)=>{
        try {
            const res = await userService.deleteTask(task_id);
            if(res.error)throw new Error(res.message);
            const taskResponse = await userService.getAllTasks(activeItem);
            setTasks(taskResponse.data);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unkown error';
            console.log('error', errorMessage);
        }

    }
    const toggleTask = (_task:Task)=>{
        handleTaskUpdate(_task);
        const _tasks:Task[] = tasks.map(elem=>{
            if (elem._id===_task._id){
                elem.done = !elem.done
            }
            return elem
        })
        setTasks(_tasks)
    }
    const handleOnBlur = (_task:Task)=>{
        setEditTask(false);
        setEditTaskDesc(false)
        handleTaskUpdate(_task);
    }
    useEffect(()=>{
        setTaskName(task.name)
    }, [])
    return <div data-aos="zoom-out" className='task-card'>
        {
            showDescription?
                editTaskDesc?<textarea onBlur={()=>handleOnBlur({...task, description:taskDesc})} className='task-description outline-emerald-100' autoFocus value={taskDesc} onChange={({target})=>setTaskDesc(target.value)}/>
                :<div onDoubleClick={()=>setEditTaskDesc(true)} className='task-description'>{taskDesc}</div>
            :undefined
        }
        <div className='task-card__leftside'>
            <div onClick={()=>{toggleTask({...task, done:!task.done})}} className={`task-card__checkbox ${task.done?'bg-app-green':'bg-white'}`}>
                {task.done?<FaCheck className='task-card__checkbox-icon'/>:undefined}
            </div>
            <div className='task-card__title'>
                <span className='task-card__tooltip'>Double click to edit</span>
                {editTask?<input className='task-card__input' autoFocus onBlur={()=>handleOnBlur({...task, name:taskName})} type="text" value={taskName} onChange={({target})=>setTaskName(target.value)} />:<p onDoubleClick={()=>setEditTask(true)}>{taskName}</p>}
            </div>
        </div>
        <div className='task-card__rightside'>
            <FaRegNoteSticky onClick={()=>setShowDescription(!showDescription)} className={`${showDescription?'text-app-green':'text-gray-300'} cursor-pointer`}/>
            <MdDeleteOutline onClick={()=>handleTaskDelete(task._id)} className='text-app-red cursor-pointer'/>
        </div>

    </div>
}
export default TaskCard;