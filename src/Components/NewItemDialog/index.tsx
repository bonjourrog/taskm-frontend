import './NewItemDialog.css';
import { NewItemDialogProps } from './NewItemDialog.props';

const NewItemDialog:React.FC<NewItemDialogProps> = ({message, icon, children})=>{
    return <div className='new-item-dialog'>
        {icon&&Object.keys(icon).length>0?(
            <header className='header'>
                {icon?.icon_node}
                {icon?.headline}
            </header>
        ):undefined}
        {message?<p className='new-item-dialog__message'>{message}</p>:undefined}
        {children}
    </div>
}
export default NewItemDialog;