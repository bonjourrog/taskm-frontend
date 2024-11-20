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

const Home:React.FC<HomeProps> = ()=>{
    const {lists, setLists} = useListStore();
    const {user, setUser} = useUserStore();
    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
    const [showNewItemDialog, setShowNewItemDialog] = useState<boolean>(false);
    const [message, setMessage] = useState<{message:string, show:boolean}>({message:"", show:false});

    const handleInnerWidth = ()=>{
        setInnerWidth(window.innerWidth)
    }
    const LogoComponent = ()=>{
        return <div className="logo">
        <HiClipboardList className="logo__icon"/>
        <span className="logo__text">TASKM</span>
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