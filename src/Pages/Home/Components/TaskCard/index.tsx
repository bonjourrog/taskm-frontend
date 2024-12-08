import './TaskCard.css';
import { FaRegNoteSticky } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { TaskCardProps } from './TaskCard.props';
import { FaCheck } from "react-icons/fa";
import { userService } from '../../../../services/user';
import { Task } from '../../../../Entity/task';
import useTaskStore from '../../../../store/useTaskStore';
import useListStore from '../../../../store/useListStore';

const TaskCard: React.FC<TaskCardProps> = ({task})=>{
    const {setTasks, tasks} = useTaskStore()
    const {setActiveItem} = useListStore();
    const handleTaskUpdate = async(_task:Task)=>{
        try {
            const response = await userService.updateTask(_task._id, _task)
            if(response.error)throw new Error(response.message);
            const _tasks:Task[] = tasks.map(elem=>{
                if (elem._id===_task._id){
                    elem.done = !elem.done
                }
                return elem
            })
            setTasks(_tasks)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unkown error';
            console.log('error', errorMessage);
        }
    }
    const handleTaskDelete = async(task_id: string)=>{
        try {
            const res = await userService.deleteTask(task_id);
            if(res.error)throw new Error(res.message);
            const taskResponse = await userService.getAllTasks(setActiveItem);
            setTasks(taskResponse.data);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unkown error';
            console.log('error', errorMessage);
        }

    }
    return <div data-aos="zoom-out" className='task-card'>
        <div className='task-card__leftside'>
            <div onClick={()=>{handleTaskUpdate({...task, done:!task.done})}} className={`task-card__checkbox ${task.done?'bg-app-green':'bg-white'}`}>
                {task.done?<FaCheck className='task-card__checkbox-icon'/>:undefined}
            </div>
            <p className='task-card__title'>
                <span className='absolute hidden group-hover:block text-nowrap -top-7 left-1/2 transform -translate-x-1/2 text-xs bg-app-green target text-white px-1 py-1 rounded-sm opacity-85'>Double click to edit</span>
                {task.name}
            </p>
        </div>
        <div className='task-card__rightside'>
            <FaRegNoteSticky className='text-app-green cursor-pointer'/>
            <MdDeleteOutline onClick={()=>handleTaskDelete(task._id)} className='text-app-red cursor-pointer'/>
        </div>

    </div>
}
export default TaskCard;