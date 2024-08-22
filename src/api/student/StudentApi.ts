import api from "@/lib/axios";
import { classesSchema, sectionEnrollmentsSchema } from "@/types/student";
import { SectionHomeArraySchema } from "@/types/teacher";
import { isAxiosError } from "axios";

//* MATRICULA

// OBTENER CLASES DISPONIBLES
//obtener los roles 


export async function getClassesAvailabilityEnroll() {
    try {
        const url = '/enroll-student/student'
        const { data } = await api(url)
        const result = classesSchema.safeParse(data)
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


export async function getClassesEnrollments() {
    try {
        const url = '/enroll-student/student/enroll'
        const { data } = await api(url)
        const result = sectionEnrollmentsSchema.safeParse(data)
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

export async function getSectionsHomeStudent() {
    try {
        const url = '/section/student/'
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

export async function deleteEnrollClassByIdSection(sectionId: number) {
    try {
        const url = `/enroll-student/enroll-delete/${sectionId}`
        const { data } = await api.delete(url)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
        throw new Error("El Servidor no responde")
    }
}

export async function enrollStudentBySectionId(sectionId: number) {
    try {
        const url = `/enroll-student/enroll`
        const payload = {
            sectionId
        }

        const { data } = await api.post(url, payload)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if(error.response.data.error){
                throw new Error(error.response.data.error)
            }
            throw new Error(error.response.data.message)
        }
        throw new Error("El Servidor no responde")
    }
}

export async function postNewImage({avatar, image}:{ avatar : boolean, image : File }) {
    try {
        const url = `/student/upload/image`
        
        const avatarString = avatar ? "true" : "false" 
        const formData = new FormData()
        formData.append("image", image)
        formData.append("avatar", avatarString)
        const { data } = await api.post(url, formData)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if(error.response.data.error){
                throw new Error(error.response.data.error)
            }
            throw new Error(error.response.data.message)
        }
        throw new Error("El Servidor no responde")
    }
}

export async function deleteImage({ imageId} : { imageId : number }) {
    try {
        const url = `/student/delete/image/${imageId}`
        const { data } = await api.delete(url)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if(error.response.data.error){
                throw new Error(error.response.data.error)
            }
            throw new Error(error.response.data.message)
        }
        throw new Error("El Servidor no responde")
    }
}

export async function deleteImageProfile() {
    try {
        const url = `/student/delete/avatar`
        const { data } = await api.delete(url)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if(error.response.data.error){
                throw new Error(error.response.data.error)
            }
            throw new Error(error.response.data.message)
        }
        throw new Error("El Servidor no responde")
    }
}