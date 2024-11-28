import './ListForm.css';
import { ListFormProps } from './ListForm.props';
import { TbColorFilter } from "react-icons/tb";
import ColorPicker from '../ColorPicker';
import { ChangeEvent, FormEvent, useState } from 'react';
import useListStore from '../../../../store/useListStore';
import { List } from '../../../../Entity/list';
import useUserStore from '../../../../store/useUserStore';
import { userService } from '../../../../services/user';

const ListForm: React.FC<ListFormProps> = ({getAllLists, setShowNewItemDialog, setMessage})=>{
    const {newList, setNewList} = useListStore();
    const {user} = useUserStore();
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

    const handleOnChange = (event:ChangeEvent<HTMLInputElement>)=>{
        const {name, value} =  event.target;
        setNewList({...newList,[name]:value} as List)
    }
    const handleOnSubmit = async(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        try {
            if(!newList.name || newList.name.length<3)throw new Error('list name is too short');
            const _newList:List = {...newList, user_id:user._id} as List
            const respose = await userService.createList(_newList, user._id)
            setShowNewItemDialog(false);
            if(respose.error)throw new Error(respose.message);
            !newList.color?_newList.color = "#8FD4AF":_newList.color = newList.color
            setNewList({name:"",color:""} as List);
            await getAllLists()
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unkown error';
            setMessage({message:errorMessage, show:true})
            setTimeout(()=>{
                setMessage({message:'', show:false})
            },3000)
        }
    }
    return <form className='flex flex-col gap-4' onSubmit={handleOnSubmit}>
        <div className='relative flex items-center gap-4'>
                <input autoComplete='off' onChange={handleOnChange} name="name" value={newList.name} type="text" className='input' placeholder='List name'/>
                <TbColorFilter onClick={()=>setShowColorPicker(true)} className='text-zinc-400 text-xl cursor-pointer hover:text-app-green'/>
                {showColorPicker?<ColorPicker  setShowColorPicker={setShowColorPicker}/>:undefined}
        </div>
        <div className='flex gap-2 justify-end'>
            <button onClick={()=>setShowNewItemDialog(false)} className='btn btn--cancel'>cancelar</button>
            <button className='btn btn--primary'>Create</button>
        </div>
    </form>
}
export default ListForm;