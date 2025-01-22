import {create} from "zustand";

interface AuthModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose:()=>void;
}

export const useAuthModel=create<AuthModelStore>((set)=>({isOpen:false,onOpen:()=>set({isOpen:true}),onClose:()=>set({isOpen:false})}))