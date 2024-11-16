import { ReactNode } from "react";

export interface NewItemDialogProps{
    children: ReactNode;
    icon?:{
        icon_node:ReactNode;
        headline:string;
    }
    message?: string;
}