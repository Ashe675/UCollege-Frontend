import api from "@/lib/axios";
import { changeCareerSchemaArray, solicitudCancelSeccionSchema } from "@/types/coordinator";
import { isAxiosError } from "axios";


export async function getChargeAcademicExcel() {
    try {
        const url = `/coordinator/get-academicLoad/export/excel`
        const { data } = await api(url, { responseType: 'blob' })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

export async function getChargeAcademicPDF() {
    try {
        const url = `/coordinator/get-academicLoad/export/pdf`
        const { data } = await api(url, { responseType: 'blob' })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

export async function getRequestCancelSection() {
    try {
        const url = `/solicitudes/cancelaciones`
        const { data } = await api(url)
        const result = solicitudCancelSeccionSchema.safeParse(data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

export async function acceptRequestChangeClass(solicitudId: number) {
    try {
        const url = `coordinator/solicitude/class-cancel/accept/${Number(solicitudId)}`
        const { data } = await api.put(url)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

export async function dennyRequestChangeClass(solicitudId: number) {
    try {
        const url = `coordinator/solicitude/class-cancel/decline/${Number(solicitudId)}`
        const { data } = await api.put(url)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}


export async function getRequestChangeCareer() {
    try {
        const url = `/solicitudes/carreras`
        const { data } = await api(url)
        const result = changeCareerSchemaArray.safeParse(data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

export async function acceptRequestChangeCareer(solicitudId: number) {
    try {
        const url = `coordinator/solicitude/career-change/accept/${Number(solicitudId)}`
        const { data } = await api.put(url)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

export async function dennyRequestChangeCareer(solicitudId: number) {
    try {
        const url = `coordinator/solicitude/career-change/decline/${Number(solicitudId)}`
        const { data } = await api.put(url)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

