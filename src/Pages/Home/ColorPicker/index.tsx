import './ColorPicker.css';
import { ColorPickerProps } from './ColorPicker.props';
import Colorful from '@uiw/react-color-colorful';
import { FaFolder } from "react-icons/fa6";
import { lighten } from 'polished';
import useListStore from '../../../store/useListStore';
import { List } from '../../../Entity/list';

const ColorPicker: React.FC<ColorPickerProps> = ({setShowColorPicker}) => {
    const {newList, newList:{name, color}, setNewList} = useListStore();
    return <div className='color-picker'>
        <div className='flex items-center gap-2 w-full px-3 py-1 rounded-2xl' style={{color:color?color:'#8fd4af', background:color?lighten(0.2, color):lighten(0.2, '#8fd4af')}}>
            <FaFolder/>
            <p>{name?name.length>15?name.substring(0, 15)+'...':name:'testing color'}</p>
        </div>
        <Colorful
            color={color}
            disableAlpha={true}
            onChange={(color) => {
                setNewList({...newList, color:color.hex} as List)
            }}
        />
        <button onClick={()=>setShowColorPicker(false)} className='btn btn--primary'>Aceptar</button>
    </div>
}
export default ColorPicker;