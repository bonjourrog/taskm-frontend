import { HiClipboardList } from 'react-icons/hi';
import AuthForm from '../../Components/AuthForm';
import './Signup.css';
import { SignupProps } from './Signup.props';
import { Link } from 'react-router-dom';

const Signup: React.FC<SignupProps> = ()=>{
    return <main className="signup">
    <AuthForm headline={{first:"Join us and", last:"get organized"}} caption='Create an account to start managing your tasks efficiently.'>
            <form>
                <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
                    Email
                    <input type="email" name="email" className='input' />
                </label>
                <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
                    User
                    <input type="text" name="email" className='input' />
                </label>
                <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
                    Password
                    <input type="password" name="password" className='input' />
                </label>
                <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
                    Verify password
                    <input type="password" name="password" className='input' />
                </label>
                <input type="submit" value="Register" className='input input--btn' />
            </form>
            <Link className='signup-btn' to={"/sign-in"}>Sign in</Link>
    </AuthForm>
</main>
    // return <main className="signup">
    //     <div className='signup__container'>
    //     <header className="header">
    //             <HiClipboardList className="header__icon"/>
    //             <span className="header__text">TASKM</span>
    //         </header>
    //         <AuthForm headline={{first:"Join us and", last:"get organized"}} caption='Create an account to start managing your tasks efficiently.'>
    //             <>
    //                 <form>
    //                     <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
    //                         Email
    //                         <input type="email" name="email" className='input'/>
    //                     </label>
    //                     <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
    //                         User
    //                         <input type="text" name="email" className='input'/>
    //                     </label>
    //                     <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
    //                         Password
    //                         <input type="password" name="password" className='input'/>
    //                     </label>
    //                     <label htmlFor="" className='w-full text-zinc-700 font-bold text-sm'>
    //                         Verify password
    //                         <input type="password" name="password" className='input'/>
    //                     </label>
    //                     <input type="submit" value="Login" className='input input--btn'/>
    //                 </form>
    //                 <Link className='signup-btn' to={"/signup"}>create an account</Link>
    //             </>
    //         </AuthForm>
    //     </div>
    //     {
    //             innerWidth > 1000? <section className='signup__leftside'>
    //                 <div className='relative w-full h-full rounded-lg overflow-hidden'>
    //                     <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-5xl text-center'>Your projects <br />
    //                     are waiting</p>
    //                     <img src="https://res.cloudinary.com/dcezb5utw/image/upload/v1731604271/taskm/cbdnrxkmgbjtrotp6v1c.png" alt="todo list image" className='object-cover w-full h-full'/>
    //                 </div>
    //         </section>:undefined
    //         }
    // </main>
}
export default Signup;