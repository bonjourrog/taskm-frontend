import './Signin.css';
import { SigninProps } from './Signin.props';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../../Components/AuthForm';
import { ChangeEvent, FormEvent, useState } from 'react';
import { signin } from '../../services/auth';

const Signin: React.FC<SigninProps> = ()=>{
    const navigate = useNavigate();
    const [formData, setFormData] = useState<{email:string, password:string}>({email:"",password:""})
    const handleOnChangeInput = (event:ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData, [event.target.name]:event.target.value})
    }
    const handleOnSubmit = async(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        try {
            const response = await signin(formData.email, formData.password)
            if(response && !response.error){
                localStorage.setItem("authToken", response.data)
                navigate('/');
            }
        } catch (error:any) {
            console.log(error.response.data);
            
        }
        
    }
    return <main className="signin">
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