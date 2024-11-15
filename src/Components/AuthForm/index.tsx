import { AuthFormProps } from './AuthForm.props';
import './AuthForm.css';
import { useEffect, useState } from 'react';
import { HiClipboardList } from 'react-icons/hi';

const AuthForm:React.FC<AuthFormProps> = ({caption, headline, children})=>{
    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth)
    const handleWidth = ()=>{
        setInnerWidth(window.innerWidth)
    }
    useEffect(()=>{
        window.addEventListener('resize', handleWidth)
        return ()=>window.removeEventListener('resize', handleWidth)
    },[])
    return  <section className='auth-form'>
        <div className='auth-form__container'>
            <header className="header">
                <HiClipboardList className="header__icon"/>
                <span className="header__text">TASKM</span>
            </header>
            <section className='auth-form__header'>
                <h1 className='auth-form__headline'>{headline.first} <br /> {headline["last"]?headline.last:undefined}</h1>
                <p className='auth-form__caption'>{caption}</p>
            </section>
            <section className='form'>
                {children}
            </section>
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
</section>
}
export default AuthForm;