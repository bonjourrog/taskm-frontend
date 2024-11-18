import { ChangeEvent, FormEvent, useState } from 'react';
import AuthForm from '../../Components/AuthForm';
import './Signup.css';
import { SignupProps } from './Signup.props';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../services/auth';
import { isEmailValid } from '../../Utils/auth';
import Dialog from '../../Components/Dialog';

interface FormData{
    user_name:string;
    email:string;
    password:string;
    verify_password:string;
}

const Signup: React.FC<SignupProps> = ()=>{
    const navigate = useNavigate();
    const [message, setMessage] = useState<{message:string, show:boolean}>({message:"", show:false});
    const [formData, setFormData] = useState<FormData>({email:"",password:"",user_name:"", verify_password:""});
    const handleOnChange = (event:ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = event.target;
        setFormData({...formData, [name]:value});
    }
    const handleOnSubmit = async(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        try {
            const {email,password, user_name, verify_password} = formData;
            if( user_name.length<5)throw new Error('user name must be al least 5 characters');
            if(password.length<5)throw new Error('password must be al least 5 characters');
            if(password !== verify_password)throw new Error('please verify password');
            if(!password || !email || !user_name)throw new Error('please fill all fields');
            if(!isEmailValid(email))throw new Error('invalid email');
            const res = await signup({...formData});
            console.log(res);
            
            if(res.error)throw new Error(res.message);
            navigate('/sign-in')
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message:'Unkown error';
            setMessage({message:errorMessage, show:true})
            setTimeout(()=>{
                setMessage({message:'', show:false})
            },3000)
        }
    }
    return <main className="signup">
    {message.show?<Dialog headline={message.message}/>:undefined}
    <AuthForm headline={{first:"Join us and", last:"get organized"}} caption='Create an account to start managing your tasks efficiently.'>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
                    Email
                    <input onChange={handleOnChange} value={formData.email} type="email" name="email" className='input' />
                </label>
                <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
                    User
                    <input onChange={handleOnChange} value={formData.user_name} type="text" name="user_name" className='input' />
                </label>
                <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
                    Password
                    <input onChange={handleOnChange} value={formData.password} type="password" name="password" className='input' />
                </label>
                <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
                    Verify password
                    <input onChange={handleOnChange} value={formData.verify_password} type="password" name="verify_password" className='input' />
                </label>
                <input type="submit" value="Register" className='input input--btn' />
            </form>
            <Link className='signup-btn' to={"/sign-in"}>Sign in</Link>
    </AuthForm>
</main>
}
export default Signup;