import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AppStore = {
    title : string,
    setTitle : (title : string) => void,
    resetTitle : () => void 
}

const initialValues  = {
    title : 'Inicio'
}

export const useAppStore = create<AppStore>()(devtools((set) => ({
    title: initialValues.title,
    setTitle : (title) => {
        set(() => ({
            title
        }))
    },
    resetTitle: () => {
        set(() => ({
            title: initialValues.title
        }))
    }
})))