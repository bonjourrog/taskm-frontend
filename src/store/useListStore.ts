import { create } from "zustand";
import { List } from "../Entity/list";

interface ListStoreState{
    newList: Partial<List>;
    setNewList:(newList: List)=>void;
}

const useListStore = create<ListStoreState>(set=>({
    newList:{
        name:"",
        color:"",
    },
    setNewList:(newList: List)=>set({newList})
}))
export default useListStore;