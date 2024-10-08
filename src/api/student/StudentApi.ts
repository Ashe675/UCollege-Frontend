import api from "@/lib/axios";
import { classesSchema, sectionEnrollmentsSchema, sectionsGradeSchema } from "@/types/student";
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

export async function getSectionsWithGrades() {
    try {
        const url = '/student/getAllGrade'
        const { data } = await api(url)
        const result = sectionsGradeSchema.safeParse(data)
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

export async function gradeToTeacher({grade, sectionId}:{ sectionId : number, grade : number }) {
    try {
        const url = `/student/value-teacher/`
        
        const payload = {
            grade : Number(grade),
            sectionId : Number(sectionId)
        }
        const { data } = await api.post(url, payload)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if(error.response.data.error){
                throw new Error(error.response.data.error)
            }
            if (isAxiosError(error) && error.response.data?.errors) {
                throw new Error(error.response.data.errors[0].msg)
            }
            throw new Error(error.response.data.message)
        }
        throw new Error("El Servidor no responde")
    }
}


export async function getCertificated() {
    try {
        const url = `/student/certificate`

        const { data } = await api(url, { responseType: 'blob' })
        return data
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            if(error.response.data.error){
                throw new Error(error.response.data.error)
            }
            if (isAxiosError(error) && error.response.data?.errors) {
                throw new Error(error.response.data.errors[0].msg)
            }
            throw new Error(error.response.data.message)
        }
        throw new Error("El Servidor no responde")
    }
}


export async function getRequestsCancelSectionStudent() {
    try {
        const url = `/solicitudes/cancelaciones`

        const { data } = await api(url)
        return data
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            if(error.response.data.error){
                throw new Error(error.response.data.error)
            }
            if (isAxiosError(error) && error.response.data?.errors) {
                throw new Error(error.response.data.errors[0].msg)
            }
            throw new Error(error.response.data.message)
        }
        throw new Error("El Servidor no responde")
    }
}


export async function sendRequestCancelSections({sectionsIds, justificacion, file}:{ sectionsIds : number[], justificacion : string, file : File }) {
    try {
        const url = `/solicitudes/cancelaciones`
        const formData = new FormData()
        formData.append('sectionIds', sectionsIds.join(','))
        formData.append('justificacion', justificacion)
        formData.append('files', file)
       
        const { data } = await api.post(url, formData)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if(error.response.data.error){
                throw new Error(error.response.data.error)
            }
            if (isAxiosError(error) && error.response.data?.errors) {
                throw new Error(error.response.data.errors[0].msg)
            }
            throw new Error(error.response.data.message)
        }
        throw new Error("El Servidor no responde")
    }
}