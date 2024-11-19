import { HiClipboardList } from 'react-icons/hi';
import './Home.css';
import { HomeProps } from './Home.props';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Lists from './Lists';
import { List } from '../../Entity/list';
import { MdAddBox } from "react-icons/md";
import NewItemDialog from '../../Components/NewItemDialog';
import { TbColorFilter } from "react-icons/tb";
import ColorPicker from './ColorPicker';
import { userService } from '../../services/user';
import useListStore from '../../store/useListStore';
import useUserStore from '../../store/useUserStore';
import { removeToken } from '../../Utils/auth';

const Home:React.FC<HomeProps> = ()=>{
    const {newList, setNewList} = useListStore();
    const {user, setUser} = useUserStore();
    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
    const [lists, setLists] = useState<List[]>([]);
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [showNewItemDialog, setShowNewItemDialog] = useState<boolean>(false);
    const handleInnerWidth = ()=>{
        setInnerWidth(window.innerWidth)
    }
    const LogoComponent = ()=>{
        return <div className="logo">
        <HiClipboardList className="logo__icon"/>
        <span className="logo__text">TASKM</span>
    </div>
    }
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
            setNewList({name:"",color:"",} as List);
            setLists([...lists, _newList])
        } catch (error) {
            console.log('An error has ocurred: ', error);
            
        }
    }
    const getAllLists = async()=>{
        try {
            const data = await userService.getAll(user._id);
            if(data && data.length>0){
                const lists:List[] = data.map(elem=>{
                    if(!elem.color){
                        return {...elem, color:"#8FD4AF"}
                    }
                    return elem
                })
                setLists(lists)
            }
        } catch (error) {
            console.log('error getting lists: ', error);   
        }
        
    }
    const handleSignout = ()=>{
        setUser({_id:"", email:"", exp:0, user:""})
        removeToken()
    }
    useEffect(()=>{
        window.addEventListener('resize', handleInnerWidth)
        return ()=>window.removeEventListener('resize', handleInnerWidth)
    }, []);
    useEffect(()=>{
        if(user._id){
            getAllLists()
        }
    },[user])
    return <main className='home'>
        <aside className='sidebar'>
            {LogoComponent()}
            <section className='home__lists'>
                <h2>Lists</h2>
                <Lists lists={lists}/>
                <button onClick={()=>setShowNewItemDialog(true)} className='new-list-btn'>+ New list</button>
            </section>
            <p onClick={handleSignout} className='absolute bottom-10 left-1/2 transform -translate-x-1/2 text-red-300 font-bold cursor-pointer hover:text-red-400'>Sign out</p>
        </aside>
        <section className='home__content'>
            <header>
                {LogoComponent()}
                <div className='flex items-center gap-2'>
                    <p className='text-xs text-zinc-500'>@{user.user}</p>
                    <div className='home__menu'>U</div>
                </div>
            </header>
            <section className='home__main-content'>
                {showNewItemDialog?<div className='home__list-dialog'>
                    <NewItemDialog message='New list'>
                                <form className='flex flex-col gap-4' onSubmit={handleOnSubmit}>
                                <div className='relative flex items-center gap-4'>
                                        <input onChange={handleOnChange} name="name" value={newList.name} type="text" className='input' placeholder='List name'/>
                                        <TbColorFilter onClick={()=>setShowColorPicker(true)} className='text-zinc-400 text-xl cursor-pointer hover:text-app-green'/>
                                        {showColorPicker?<ColorPicker  setShowColorPicker={setShowColorPicker}/>:undefined}
                                </div>
                                <div className='flex gap-2 justify-end'>
                                    <button onClick={()=>setShowNewItemDialog(false)} className='btn btn--cancel'>cancelar</button>
                                    <button className='btn btn--primary'>Create</button>
                                </div>
                            </form>
                    </NewItemDialog>
                </div>:undefined}
                <h2>@{user.user}</h2>
                <h1 className='list-name'>{lists.length>0?<p className='font-extrabold text-lg'>Lists</p>:"Create a new list"}</h1>
                {
                    lists.length > 0?(
                        innerWidth>700?undefined:<Lists lists={lists} innerWidth={innerWidth}/>
                    ):<img src="https://res.cloudinary.com/dcezb5utw/image/upload/v1731703774/taskm/hh7syclotluewskbc2fm.png" alt="notes icon" className='w-[40em] mx-auto my-auto'/>
                }
                <MdAddBox className='new-list-floating' onClick={()=>setShowNewItemDialog(true)}/>
            </section>
        </section>
    </main>
}
export default Home;