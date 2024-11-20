import { Dispatch, SetStateAction } from "react";

export interface ListFormProps{
    getAllLists:()=>Promise<any>;
    setShowNewItemDialog: Dispatch<SetStateAction<boolean>>;
    setMessage: Dispatch<SetStateAction<{message:string, show:boolean}>>;
}