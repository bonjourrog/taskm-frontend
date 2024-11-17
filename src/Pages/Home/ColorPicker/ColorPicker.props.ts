import { Dispatch, SetStateAction } from "react";

export interface ColorPickerProps{
    setShowColorPicker:Dispatch<SetStateAction<boolean>>;
}