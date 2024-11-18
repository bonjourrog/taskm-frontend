import { create } from "zustand";
import { User } from "../Entity/user";

interface UserStoreState{
    user:User;
    setUser:(user:User)=>void;
}
const useUserStore = create<UserStoreState>(set=>({
    user:{
        _id:"",
        email:"",
        exp:0,
        user:""
    },
    setUser:(user:User)=>set({user})
}))
export default useUserStore;