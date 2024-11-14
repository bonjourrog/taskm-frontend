import { AuthFormProps } from './AuthForm.props';
import './AuthForm.css';

const AuthForm:React.FC<AuthFormProps> = ({caption, headline, children})=>{
    return  <section className='form'>
    <section className='form__header'>
        <h1 className='form__headline'>{headline.first} <br /> {headline["last"]?headline.last:undefined}</h1>
        <p className='form__caption'>{caption}</p>
    </section>
    <section className='form__container'>
        {children}
    </section>
</section>
}
export default AuthForm;