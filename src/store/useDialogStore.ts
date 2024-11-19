import { create } from "zustand";

interface DialogStoreState{
    displayDialog:boolean; 
    setDisplayDialog:(displayDialog:boolean)=>void;
}

const useDialogtore = create<DialogStoreState>(set=>({
    displayDialog:false,
    setDisplayDialog: (displayDialog:boolean)=>set({displayDialog})
}))
export default useDialogtore;