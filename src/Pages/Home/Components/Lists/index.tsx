import './Lists.css';
import { ListsProps } from './Lists.props';
import { lighten } from 'polished';
import { FaFolder } from "react-icons/fa6";
import { TbProgress } from "react-icons/tb";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from 'react';
import ListMenu from '../../Components/ListMenu';
import useDialogtore from '../../../../store/useDialogStore';
import Colorful from '@uiw/react-color-colorful';
import useListStore from '../../../../store/useListStore';
import { List } from '../../../../Entity/list';
import { userService } from '../../../../services/user';
import { Response } from '../../../../Entity/response';
import useUserStore from '../../../../store/useUserStore';
import useTaskStore from '../../../../store/useTaskStore';
import { Task } from '../../../../Entity/task';

const Lists: React.FC<ListsProps> = ({lists, innerWidth})=>{
    const {displayDialog, setDisplayDialog} = useDialogtore()
    const {newList, setNewList, setLists, activeItem, setActiveItem} = useListStore()
    const {user} = useUserStore()
    const {setTasks} = useTaskStore()
    const [isEditing, setIsEditing] = useState<boolean>(false);
    
    const handleClick = async(id:string)=>{
        try {
            setActiveItem(id);
            const response = await userService.getAllTasks(id)
            if(response.error)throw new Error(response.message)
            const tasks:Task[] = response.data;
            setTasks(tasks)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unkown error'
            console.log(errorMessage);
        }
    }
    const handleListUpdate = async()=>{
        try {
            const repsose: Response = await userService.updateList(activeItem, newList as List);
            if(repsose.error)throw new Error(repsose.message);
            const lists = await userService.getAll(user._id)
            if(lists.error)throw new Error(lists.message);
            setLists(lists.data)
            setIsEditing(false)
        } catch (error) {
            const messageError = error instanceof Error ? error.message : 'Unkown error';
            console.log(messageError);
        }
    }
    return <ul className='lists'>
        {displayDialog?<>
            <div onClick={()=>{setDisplayDialog(false)}} className='lists__dialog'></div>
            <ListMenu setIsEditing={setIsEditing}/>
            </>:undefined
        }
        {isEditing?<div className='edit-menu'>
            <input className='py-1 px-2 rounded-md text-white' style={{background:lighten(0.2, newList.color as string), outline:`.2em solid ${newList.color}`}} type="text" value={newList.name? newList.name:""} onChange={(event)=>{
                const {value} = event.target
                    setNewList({...newList as List, name:value})
            }}/>
            <Colorful
            color={newList.color}
            disableAlpha={true}
            onChange={(color) => {
                setNewList({...newList, color:color.hex} as List)
            }}
        />
        <button onClick={handleListUpdate} className='btn btn--primary'>Aceptar</button>
        <button onClick={()=>setIsEditing(false)} className='btn btn--cancel'>Cancelar</button>
        </div>:undefined}
        {
            lists.map(list=>(
                <li key={list._id} onClick={()=>{handleClick(list._id)}} style={{background:innerWidth&&innerWidth<700||list._id == activeItem?lighten(0.2,list.color):'white', color:innerWidth&&innerWidth?list.color:activeItem===list._id?'white':'#3E3E3E'}} className='list'>
                    <div className='flex items-center gap-2'>
                        <FaFolder style={{color:list.color}}/>
                        <span className='list__title'>{list.name.length>20?list.name.substring(0,20)+'...':list.name}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='list__progress'>
                            <p className='text-xs'>progress</p>
                            <TbProgress className='text-3xl'/>
                        </div>
                        <HiDotsVertical onClick={()=>{setDisplayDialog(true)}} className='transform hover:scale-125'/>
                    </div>
                </li>
            ))
        }
    </ul>
}
export default Lists;