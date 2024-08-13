import { UserData } from "@/types/auth";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type UserStore = {
    user: UserData,
    setUser : (user : UserData) => void,
    deleteUser: () => void
}

const initialValues = {
    id: 0,
    institutionalEmail: '',
    role: {
        name: ''
    },
    person: {
        firstName: '',
        lastName: ''
    },
    avatar : null
}

export const useUserStore = create<UserStore>()(devtools((set) => ({
    user: initialValues,
    setUser : (user) => {
        set(() => ({
            user : user
        }))
    }, 
    deleteUser: () => {
        set(() => ({
            user: initialValues
        }))
    }
})))
