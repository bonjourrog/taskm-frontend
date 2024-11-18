import './Lists.css';
import { ListsProps } from './Lists.props';
import { lighten } from 'polished';
import { FaFolder } from "react-icons/fa6";
import { TbProgress } from "react-icons/tb";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from 'react';

const Lists: React.FC<ListsProps> = ({lists, innerWidth})=>{
    const [activeItem, setActiveItem] = useState<string>("");
    const handleClick = (id:string)=>{
        setActiveItem(id)
    }
    return <ul className='lists'>
        {
            lists.map(list=>(
                <li key={`${list.name}-${list.id}`} onClick={()=>{handleClick(list.id)}} style={{background:innerWidth&&innerWidth<700||list.id == activeItem?lighten(0.2,list.color):'white', color:innerWidth&&innerWidth?list.color:activeItem===list.id?'white':'#3E3E3E'}} className='list'>
                    <div className='flex items-center gap-2'>
                        <FaFolder style={{color:list.color}}/>
                        <span className='list__title'>{list.name.length>20?list.name.substring(0,20)+'...':list.name}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='list__progress'>
                            <p className='text-xs'>progress</p>
                            <TbProgress className='text-3xl'/>
                        </div>
                        <HiDotsVertical className='transform hover:scale-125'/>
                    </div>
                </li>
            ))
        }
    </ul>
}
export default Lists;