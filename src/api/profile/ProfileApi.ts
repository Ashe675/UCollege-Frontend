import api from "@/lib/axios"
import userSchema from "@/types/profile"
import { isAxiosError } from "axios"

export async function selectProfileUser(){
    try{
        const url = ``
        const {data} = await api(url)
        const result = userSchema.safeParse(data)
        if (result.success){
            return result.data
        }
    } catch (error){
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}