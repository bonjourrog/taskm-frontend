export interface Task{
    _id: string;
    name: string;
    description: string;
    done: boolean;
    user_id: string;
    list_id: string;
    updated_at: Date;
    created_at: Date;
}