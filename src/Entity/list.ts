import { Task } from "./task";

export interface List{
    id: string;
    name: string;
    color: string;
    tasks: Task[];
    user_id: string;
    updated_at: Date;
    created_at: Date;
}