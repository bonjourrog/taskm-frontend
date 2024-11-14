import { useEffect, useState } from 'react';
import './Signin.css';
import { SigninProps } from './Signin.props';
import { HiClipboardList } from "react-icons/hi";
import { Link } from 'react-router-dom';
import AuthForm from '../../Components/AuthForm';

const Signin: React.FC<SigninProps> = ()=>{
    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth)
    const handleWidth = ()=>{
        setInnerWidth(window.innerWidth)
    }
    useEffect(()=>{
        window.addEventListener('resize', handleWidth)
        return ()=>window.removeEventListener('resize', handleWidth)
    },[])
    return <main className="signin">
       <div className='signin__container'>
        <header className="header">
                <HiClipboardList className="header__icon"/>
                <span className="header__text">TASKM</span>
            </header>
            <AuthForm headline={{first:"Ready to get", last:"things done?"}} caption='Sign in to manage your tasks and keep your productivity flowing.'>
                <>
                    <form>
                        <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
                            email
                            <input type="email" name="email" className='input'/>
                        </label>
                        <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
                            Password
                            <input type="password" name="password" className='input'/>
                        </label>
                        <input type="submit" value="Login" className='input input--btn'/>
                    </form>
                    <Link className='signup-btn' to={"/signup"}>create an account</Link>
                </>
            </AuthForm>
        </div>
        {
                innerWidth > 1000? <section className='signin__leftside'>
                    <div className='relative w-full h-full rounded-lg overflow-hidden'>
                        <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-5xl text-center'>Your projects <br />
                        are waiting</p>
                        <img src="https://res.cloudinary.com/dcezb5utw/image/upload/v1731604271/taskm/cbdnrxkmgbjtrotp6v1c.png" alt="todo list image" className='object-cover w-full h-full'/>
                    </div>
            </section>:undefined
            }
    </main>
}
export default Signin;