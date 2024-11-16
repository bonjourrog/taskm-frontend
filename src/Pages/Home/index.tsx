import { HiClipboardList } from 'react-icons/hi';
import './Home.css';
import { HomeProps } from './Home.props';
import { useEffect, useState } from 'react';
import Lists from './Lists';
import { List } from '../../Entity/list';
import { MdAddBox } from "react-icons/md";
import { LISTS_ADATA_MOCK } from '../../Mocks/list.mock';
import NewItemDialog from '../../Components/NewItemDialog';
import { TbColorFilter } from "react-icons/tb";
import ColorPicker from './ColorPicker';

const Home:React.FC<HomeProps> = ()=>{
    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
    const [lists, setLists] = useState<List[]>(LISTS_ADATA_MOCK);
    const [colorSelected, setColorSelected] = useState<string>("");
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [newList, setNewList] = useState<string>("");
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
    useEffect(()=>{
        window.addEventListener('resize', handleInnerWidth)
        return ()=>window.removeEventListener('resize', handleInnerWidth)
    }, [])
    return <main className='home'>
        <aside className='sidebar'>
            {LogoComponent()}
            <section className='home__lists'>
                <h2>Lists</h2>
                <Lists lists={lists}/>
                <button onClick={()=>setShowNewItemDialog(true)} className='new-list-btn'>+ New list</button>
            </section>
        </aside>
        <section className='home__content'>
            <header>
                {LogoComponent()}
                <div className='flex items-center gap-2'>
                    <p className='text-xs text-zinc-500'>@Username</p>
                    <div className='home__menu'>U</div>
                </div>
            </header>
            <section className='home__main-content'>
                {showNewItemDialog?<div className='home__list-dialog'>
                    <NewItemDialog message='New list'>
                            <div className='relative flex items-center gap-4'>
                                <input onChange={(event=>setNewList(event.target.value))} value={newList} type="text" className='input' placeholder='List name'/>
                                <TbColorFilter onClick={()=>setShowColorPicker(true)} className='text-zinc-400 text-xl cursor-pointer hover:text-app-green'/>
                                {showColorPicker?<ColorPicker text={newList} setShowColorPicker={setShowColorPicker} colorSelected={colorSelected} setColorSelected={setColorSelected}/>:undefined}
                            </div>
                            <div className='flex gap-2 justify-end'>
                                <button onClick={()=>setShowNewItemDialog(false)} className='btn btn--cancel'>cancelar</button>
                                <button className='btn btn--primary'>Create</button>
                            </div>
                    </NewItemDialog>
                </div>:undefined}
                <h2>@username</h2>
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