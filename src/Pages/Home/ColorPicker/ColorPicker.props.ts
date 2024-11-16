import { Dispatch, SetStateAction } from "react";

export interface ColorPickerProps{
    text:string;
    colorSelected:string;
    setColorSelected:Dispatch<SetStateAction<string>>;
    setShowColorPicker:Dispatch<SetStateAction<boolean>>;
}