import api from "@/lib/axios";
import { BuildingsArraySchema, CancelSectionPayload, ClassesArraySchema, ClassSectionForm, dataSchemaStats, DepartmentSchema, DepartmentSchemaPage, DepartmentSchemaWithSections, DetailSectionByIdSchema, enrollmentsByDepartmentResponseSchema, IncreaseQuota, NewSectionPayload } from "@/types/department_head";
import { isAxiosError } from "axios";

// crear una nueva seccion del periodo actual
export async function createNewCurrentSection(formData: ClassSectionForm) {
    try {
        const url = '/section/'
        console.log('current')
        const IH = +formData.IH
        const FH = +formData.FH
        const quota = +formData.quota
        const classId = +formData.classId
        const classroomId = +formData.classroomId
        const teacherId = +formData.teacherId
        const days = formData.days.map(day => +day)

        const payload: NewSectionPayload = {
            IH,
            FH,
            quota,
            classId,
            classroomId,
            teacherId,
            days
        }

        const { data } = await api.post(url, payload)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response?.data.error) {
            throw new Error(error.response.data.error)
        }
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors[0].msg)
        }
        throw new Error("El servidor no Responde")
    }
}

// crear una nueva seccion par el proximo periodo
export async function createNewNextSection(formData: ClassSectionForm) {
    try {
        const url = '/section/next'
        const IH = +formData.IH
        const FH = +formData.FH
        const quota = +formData.quota
        const classId = +formData.classId
        const classroomId = +formData.classroomId
        const teacherId = +formData.teacherId
        const days = formData.days.map(day => +day)

        const payload: NewSectionPayload = {
            IH,
            FH,
            quota,
            classId,
            classroomId,
            teacherId,
            days
        }

        const { data } = await api.post(url, payload)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response?.data.error) {
            throw new Error(error.response.data.error)
        }
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors[0].msg)
        }
        throw new Error("El servidor no Responde")
    }
}

// cancelar seccion
export async function cancelSectionById({ id, payload }: { id: number, payload: CancelSectionPayload }) {
    try {
        const url = `/section/deactivate/${id}`
        const { data } = await api.put(url, payload)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

// incrementar capacidad de secciones
export async function increaseQuotaBySectionId({ id, payload }: { id: number, payload: IncreaseQuota }) {
    try {
        const url = `/section/capacity/${id}`
        const newIncrement = Number(payload.increment)
        const newPayload : IncreaseQuota = {increment : newIncrement }
        const { data } = await api.put(url, newPayload)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

// Actualizar seccion 
export async function updateSectionById({ id, payload }: { id: number, payload: ClassSectionForm }) {
    try {
        const url = `/section/${id}`
        const classroomId = +payload.classroomId
        const teacherId = +payload.teacherId
        const { data } = await api.put(url, { ...payload, classroomId, teacherId })
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

// Actualizar seccion next
export async function updateNextSectionById({ id, payload }: { id: number, payload: ClassSectionForm }) {
    try {
        const url = `/section/next/${id}`
        const classroomId = +payload.classroomId
        const teacherId = +payload.teacherId
        const { data } = await api.put(url, { ...payload, classroomId, teacherId })
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}


// los maestros por departamento
export async function getSectionById(id: number) {
    try {
        const url = `/section/${id}`
        const { data } = await api(url)
        const result = DetailSectionByIdSchema.safeParse(data)
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

// los maestros por departamento
export async function getTeachersByDepartment() {
    try {
        const url = '/section/department/teacher'
        const { data } = await api(url)

        const result = DepartmentSchema.safeParse(data)
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

// los maestros por departamento
export async function getTeachersByDepartmentPage({page, limit} : { page : number, limit: number }) {
    try {
        const url = `/section/department/teacher-page/?page=${page}&limit=${limit}`
        const { data } = await api(url)

        const result = DepartmentSchemaPage.safeParse(data)
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


// los estudiante por departamento
export async function getStudentsEnrollmentsByDepartmentPage({page, limit} : { page : number, limit: number }) {
    try {
        const url = `/section/enrollments/current/?page=${page}&limit=${limit}`
        const { data } = await api(url)

        const result = enrollmentsByDepartmentResponseSchema.safeParse(data)
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


export async function getClassroomsByDepartment() {
    try {
        const url = '/department-head/buildings-rooms'
        const { data } = await api(url)
        const result = BuildingsArraySchema.safeParse(data)
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

export async function getClassesByDepartment() {
    try {
        const url = '/department-head/classes'
        const { data } = await api(url)
        const result = ClassesArraySchema.safeParse(data)
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

export async function getSectionsByDepartment() {
    try {
        const url = '/section/department/actual'
        const { data } = await api(url)
        const result = DepartmentSchemaWithSections.safeParse(data)
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

export async function getSectionsByDepartmentNexPeriod() {
    try {
        const url = '/section/department/next'
        const { data } = await api(url)
        const result = DepartmentSchemaWithSections.safeParse(data)
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

// los maestros por departamento
export async function getClassesStats() {
    try {
        const url = `/statistics/estadisticas-departamento`
        const { data } = await api(url)
        const result = dataSchemaStats.safeParse(data)
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

// los maestros por departamento
export async function resetPasswordToTeacher(id: number) {
    try {
        const url = `/auth/forgot-password-teacher/${id}`
        const { data } = await api.post(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}