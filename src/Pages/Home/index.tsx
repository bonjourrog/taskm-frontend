import { HiClipboardList } from 'react-icons/hi';
import './Home.css';
import { HomeProps } from './Home.props';
import { useEffect, useState } from 'react';
import Lists from './Components/Lists';
import { List } from '../../Entity/list';
import { MdAddBox } from "react-icons/md";
import NewItemDialog from '../../Components/NewItemDialog';
import { userService } from '../../services/user';
import useListStore from '../../store/useListStore';
import useUserStore from '../../store/useUserStore';
import { removeToken } from '../../Utils/auth';
import Dialog from '../../Components/Dialog';
import { Response } from '../../Entity/response';
import ListForm from './Components/ListForm';
import { MdTaskAlt } from "react-icons/md";
import TaskForm from './Components/TaskForm';
import useTaskStore from '../../store/useTaskStore';
import TaskCard from './Components/TaskCard';
import { MdOutlineLibraryAdd } from "react-icons/md";

const Home:React.FC<HomeProps> = ()=>{
    const {lists, setLists, activeItem, setActiveItem} = useListStore();
    const {user, setUser} = useUserStore();
    const {tasks} = useTaskStore();
    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
    const [showNewItemDialog, setShowNewItemDialog] = useState<boolean>(false);
    const [message, setMessage] = useState<{message:string, show:boolean}>({message:"", show:false});
    const [displayNewTaskForm, setDisplaynewTaskForm] = useState<boolean>(false);
    const handleInnerWidth = ()=>{
        setInnerWidth(window.innerWidth)
    }
    const LogoComponent = ()=>{
        return <div className="logo">
        <HiClipboardList className="logo__icon"/>
        <span onClick={()=>setActiveItem("")} className="logo__text">TASKM</span>
    </div>
    }
    const getAllLists = async()=>{
        try {
            const respose:Response = await userService.getAll(user._id);
            if(respose.error)throw new Error(respose.message);
            const data:List[]= respose.data;
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
            const errorMessage = error instanceof Error ? error.message : 'Unkown error'
            setMessage({message:errorMessage, show:true})
            setTimeout(()=>{
                setMessage({message:'', show:false})
            },3000)
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
            {message.show?<Dialog headline={message.message}/>:undefined}
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
                        <ListForm getAllLists={getAllLists} setShowNewItemDialog={setShowNewItemDialog} setMessage={setMessage}/>
                    </NewItemDialog>
                </div>:undefined}
                <div className='relative flex items-center justify-between w-full pr-20 mt-10'>
                    <h2>@{user.user}</h2>
                    {displayNewTaskForm?<div className='absolute right-6 top-5 z-10'>
                        <NewItemDialog icon={{icon_node:<MdTaskAlt className='font-bold text-5xl text-app-green'/>,headline:'New task'}}>
                            <TaskForm setDisplaynewTaskForm={setDisplaynewTaskForm}/>
                        </NewItemDialog>
                    </div>:undefined}
                    {activeItem && innerWidth>700?<button onClick={()=>{setDisplaynewTaskForm(true)}} className='btn border-2 border-dashed border-app-green text-app-green font-bold hover:bg-app-green hover:text-white'>New task</button>:undefined}
                </div>
                <h1 className='list-name'>{lists.length>0?<p className='font-extrabold text-lg'>{!activeItem?'List':lists.find(elem=>elem._id===activeItem)?.name}</p>:"Create a new list"}</h1>
                {
                    lists.length > 0?(
                        innerWidth>700?<div className='flex flex-col gap-10 w-3/4 mt-10'>
                            <div className='flex flex-col gap-4 ml-5'>
                                <p>Todo</p>
                                {tasks && tasks.length>0?tasks.map(task=>!task.done?<TaskCard key={task._id} task={task}/>:undefined):undefined}
                            </div>
                            <div className='flex flex-col gap-4 ml-5'>
                                <p>Done</p>
                                {tasks && tasks.length>0?tasks.map(task=>task.done?<TaskCard key={task._id} task={task}/>:undefined):undefined}
                            </div>
                        </div>:<div className='flex w-full overflow-hidden'>
                            <div className={`flex-none w-full transform duration-150 ease-in-out ${activeItem ? '-translate-x-full' : '-translate-x-0'}`}>
                                <Lists lists={lists} innerWidth={innerWidth}/>
                            </div>
                            <div className={`flex-none w-full transition-all duration-150 ease-in-out -mr-40 ${activeItem ? '-translate-x-full' : '-translate-x-0'}`}>
                                <div className='flex flex-col gap-4 ml-0'>
                                    <p>Todo</p>
                                    {tasks && tasks.length>0?tasks.map(task=>!task.done?<TaskCard key={task._id} task={task}/>:undefined):undefined}
                                </div>
                                <div className='flex flex-col gap-4 ml-0'>
                                    <p>Done</p>
                                    {tasks && tasks.length>0?tasks.map(task=>task.done?<TaskCard key={task._id} task={task}/>:undefined):undefined}
                                </div>
                            </div>
                        </div>
                    ):<img src="https://res.cloudinary.com/dcezb5utw/image/upload/v1731703774/taskm/hh7syclotluewskbc2fm.png" alt="notes icon" className='w-[40em] mx-auto my-auto'/>
                }
                {!activeItem?<MdAddBox className='new-list-floating' onClick={()=>setShowNewItemDialog(true)}/>
                :<button onClick={()=>{setDisplaynewTaskForm(true)}} className='new-list-floating'>
                    <MdOutlineLibraryAdd/>
                </button>}
            </section>
        </section>
    </main>
}
export default Home;