import './NewItemDialog.css';
import { NewItemDialogProps } from './NewItemDialog.props';

const NewItemDialog:React.FC<NewItemDialogProps> = ({message, icon, children})=>{
    return <div className='flex flex-col gap-4 w-80 h-auto p-8 shadow-lg shadow-zinc-200 rounded-3xl bg-white'>
        {icon&&Object.keys(icon).length>0?(
            <div>
                {icon?.icon_node}
                {icon?.headline}
            </div>
        ):undefined}
        {message?<p className='font-bold'>{message}</p>:undefined}
        <form className='flex flex-col gap-4' onSubmit={(event)=>{event.preventDefault()}}>
            {children}
        </form>
    </div>
}
export default NewItemDialog;