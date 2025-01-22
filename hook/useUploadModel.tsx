"use client"

import {create} from "zustand";

interface uploadModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose:()=>void;
}

export const useuploadModel=create<uploadModelStore>((set)=>({isOpen:false,onOpen:()=>set({isOpen:true}),onClose:()=>set({isOpen:false})}))