import { create } from "zustand";
import { User } from "../Entity/user";

interface UserStoreState{
    user:User;
    setUser:(user:User)=>void;
}
const useUserStore = create<UserStoreState>(set=>({
    user:{} as User,
    setUser:(user:User)=>set({user})
}))
export default useUserStore;