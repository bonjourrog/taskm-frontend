import './Signin.css';
import { SigninProps } from './Signin.props';
import { Link } from 'react-router-dom';
import AuthForm from '../../Components/AuthForm';

const Signin: React.FC<SigninProps> = ()=>{
    return <main className="signin">
        <AuthForm headline={{first:"Ready to get", last:"things done?"}} caption='Sign in to manage your tasks and keep your productivity flowing.'>
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
        </AuthForm>
    </main>
}
export default Signin;