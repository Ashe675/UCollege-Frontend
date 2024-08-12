import api from "@/lib/axios";
import { SectionHomeArraySchema, SectionSpaceSchema } from "@/types/teacher";
import { isAxiosError } from "axios";

export async function getSectionsHomeForTeacher() {
    try {
        const url = '/section/teacher/'
        const { data } = await api(url)
        const result = SectionHomeArraySchema.safeParse(data)
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


export async function getSectionSpaceById(sectionId: string) {
    try {
        if (isNaN(+sectionId)) {
            throw new Error("Id no valido")
        }
        const url = `/section/space/${+sectionId}`
        const { data } = await api(url)
        const result = SectionSpaceSchema.safeParse(data)
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

export async function updateInfoVirtualSpaceSection({ formData, sectionId }: {
    formData: {
        title: string;
        description: string;
    },
    sectionId: number
}) {
    try {
        if (isNaN(sectionId)) {
            throw new Error("Id no valido")
        }
        const url = `/teacher/section-info/${sectionId}`
        const { data } = await api.put(url, formData)

        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

export async function uploadVideo({ file, sectionId }: { file: File, sectionId: number }) {
    try {
        if (isNaN(+sectionId)) {
            throw new Error("Id no valido")
        }
        if (!file) {
            throw new Error("No se ha subido ningun video.")
        }
        const url = `/section/resources/${+sectionId}`
        const formData = new FormData()

        formData.append('file', file)

        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

export async function deleteVideoByResourceId(resourceId: number) {
    try {
        if (isNaN(+resourceId)) {
            throw new Error("Id no valido")
        }
        const url = `/section/resources/${+resourceId}`
        const { data } = await api.delete(url)

        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}
