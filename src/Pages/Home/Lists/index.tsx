import './Lists.css';
import { ListsProps } from './Lists.props';
import { lighten } from 'polished';
import { FaFolder } from "react-icons/fa6";
import { TbProgress } from "react-icons/tb";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from 'react';
import ListMenu from '../ListMenu';

const Lists: React.FC<ListsProps> = ({lists, innerWidth})=>{
    const [displayMenu, setDisplayMenu] = useState<boolean>(false)
    const [activeItem, setActiveItem] = useState<string>("");
    const handleClick = (id:string)=>{
        setActiveItem(id)
    }
    return <ul className='lists'>
        {
            lists.map(list=>(
                <li key={list._id} onClick={()=>{handleClick(list._id)}} style={{background:innerWidth&&innerWidth<700||list._id == activeItem?lighten(0.2,list.color):'white', color:innerWidth&&innerWidth?list.color:activeItem===list._id?'white':'#3E3E3E'}} className='list'>
                    {displayMenu?<>
                        <div onClick={()=>{setDisplayMenu(false)}} className='absolute top-0 left-0 w-screen h-screen bg-zinc-600 opacity-15 z-10 cursor-default'></div>
                        <ListMenu/>
                    </>:undefined}
                    <div className='flex items-center gap-2'>
                        <FaFolder style={{color:list.color}}/>
                        <span className='list__title'>{list.name.length>20?list.name.substring(0,20)+'...':list.name}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='list__progress'>
                            <p className='text-xs'>progress</p>
                            <TbProgress className='text-3xl'/>
                        </div>
                        <HiDotsVertical onClick={()=>{setDisplayMenu(true)}} className='transform hover:scale-125'/>
                    </div>
                </li>
            ))
        }
    </ul>
}
export default Lists;