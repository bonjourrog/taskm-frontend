import './ColorPicker.css';
import { ColorPickerProps } from './ColorPicker.props';
import Colorful from '@uiw/react-color-colorful';
import { FaFolder } from "react-icons/fa6";
import { lighten } from 'polished';

const ColorPicker: React.FC<ColorPickerProps> = ({text,colorSelected, setColorSelected, setShowColorPicker}) => {
    return <div className='color-picker'>
        <div className='flex items-center gap-2 w-full px-3 py-1 rounded-2xl' style={{color:colorSelected?colorSelected:'#8fd4af', background:colorSelected?lighten(0.2, colorSelected):lighten(0.2, '#8fd4af')}}>
            <FaFolder/>
            <p>{text?text.length>15?text.substring(0, 15)+'...':text:'testing color'}</p>
        </div>
        <Colorful
            color={colorSelected}
            disableAlpha={true}
            onChange={(color) => {
                setColorSelected(color.hex)
            }}
        />
        <button onClick={()=>setShowColorPicker(false)} className='btn btn--primary'>Aceptar</button>
    </div>
}
export default ColorPicker;