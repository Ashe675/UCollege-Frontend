import api from "@/lib/axios";
import { RegionalCenterFacultyCareerId } from "@/types/auth";
import { isAxiosError } from "axios";

export async function selectCareerStudent({optionId} : RegionalCenterFacultyCareerId) {
    try {
        const url = `/enroll/student/select-career`
        const {data} = await api.post<string>(url, { optionId })
        return data
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El servidor no Responde")
    }
}
