import { create } from "zustand";
import { List } from "../Entity/list";

interface ListStoreState{
    newList: Partial<List>;
    setNewList:(newList: List)=>void;
    lists:List[];
    setLists: (lists:List[])=>void;
    activeItem: string;
    setActiveItem:(activeItem: string)=>void;
}

const useListStore = create<ListStoreState>(set=>({
    newList:{
        name:"",
        color:"",
    },
    lists:[],
    activeItem: "",
    setActiveItem:(activeItem: string)=>set({activeItem}),
    setNewList:(newList: List)=>set({newList}),
    setLists:(lists:List[])=>set({lists})
}))
export default useListStore;