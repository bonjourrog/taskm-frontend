import { Dispatch, SetStateAction } from "react";

export interface ListMenuProps{
    listId:string;
    setIsEditing:Dispatch<SetStateAction<boolean>>;
}