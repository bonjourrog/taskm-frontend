import './Dialog.css';
import { DialogProps } from './Dialog.props';

const Dialog: React.FC<DialogProps> = ({headline, caption, bgColor, txtColor, className})=>{
    return <p className={`fixed top-10 left-1/2 transform -translate-x-1/2 py-2 px-6 rounded-lg bg-app-green text-white front-bold z-20 ${className}`}>{headline}</p>
}
export default Dialog;