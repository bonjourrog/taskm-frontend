import './Signin.css';
import { SigninProps } from './Signin.props';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../../Components/AuthForm';
import { ChangeEvent, FormEvent, useState } from 'react';
import { signin } from '../../services/auth';
import Dialog from '../../Components/Dialog';

const Signin: React.FC<SigninProps> = ()=>{
    const navigate = useNavigate();
    const [message, setMessage] = useState<{message:string, show:boolean}>({message:"", show:false});
    const [formData, setFormData] = useState<{email:string, password:string}>({email:"",password:""})
    const handleOnChangeInput = (event:ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData, [event.target.name]:event.target.value})
    }
    const handleOnSubmit = async(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        try {
            if(!formData.email || !formData.password)throw new Error('email and password are required');
            const response = await signin(formData.email, formData.password)
            if(response.error)throw new Error(response.message)
            localStorage.setItem("authToken", response.data)
            navigate('/');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message:'Unkown error';
            setMessage({message:errorMessage, show:true})
            setTimeout(()=>{
                setMessage({message:'', show:false})
            },3000)
        }
        
    }
    return <main className="signin">
        {message.show?<Dialog headline={message.message}/>:undefined}
        <AuthForm headline={{first:"Ready to get", last:"things done?"}} caption='Sign in to manage your tasks and keep your productivity flowing.'>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
                    email
                    <input onChange={handleOnChangeInput} type="email" name="email" className='input'/>
                </label>
                <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
                    Password
                    <input onChange={handleOnChangeInput} type="password" name="password" className='input'/>
                </label>
                <input type="submit" value="Login" className='input input--btn'/>
            </form>
            <Link className='signup-btn' to={"/sign-up"}>create an account</Link>
        </AuthForm>
    </main>
}
export default Signin;