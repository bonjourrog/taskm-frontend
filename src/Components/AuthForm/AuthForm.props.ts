import { ReactNode } from "react";

export interface AuthFormProps{
    headline: {
        first: string;
        last:string
    };
    caption: string;
    children: ReactNode;
}