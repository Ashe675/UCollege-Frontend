import api from "@/lib/axios";
import { InscriptionData, inscriptionSchema, RegionalCentersSchema, resultDetailSchema } from "@/types/admission";
import { isAxiosError } from "axios";

// obtener los centros regionales
export async function getRegionalCenters() {
    try {
        const url = '/admission/centers'
        const { data } = await api(url)
        const result = RegionalCentersSchema.safeParse(data)
        if (result.success) {
            return result.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El servidor no Responde")
    }
}

// Inscribirse
export async function createInscription(formData: InscriptionData) {
    try {
        const { name, lastName: lastNames, principalCareerId, secondaryCareerId, regionalCenterId, photoCertificate, dni, phoneNumber, email } = formData
        const firstName = name.split(" ")[0]
        const middleName = name.split(" ")[1] ? name.split(" ")[1] : ""
        const secondLastName = lastNames.split(" ")[1] ? lastNames.split(" ")[1] : ""
        const lastName = lastNames.split(" ")[0]

        const form = new FormData();
        form.append('firstName', firstName);
        form.append('middleName', middleName);
        form.append('secondLastName', secondLastName);
        form.append('lastName', lastName);
        form.append('principalCareerId', principalCareerId);
        form.append('secondaryCareerId', secondaryCareerId);
        form.append('regionalCenterId', regionalCenterId);
        form.append('dni', dni);
        form.append('phoneNumber', phoneNumber);
        form.append('email', email);

        // Agregar el archivo photoCertificate
        if (photoCertificate) {
            form.append('photoCertificate', photoCertificate[0]);
           
        }

        const url = '/inscriptions/register'
        const { data } = await api.post(url, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El servidor no Responde")
    }
}

// subir notas
export async function uploadCSVGrades(file: File) {
    try {
        const formData = new FormData();
        formData.append('grades', file);

        const url = '/upload/grades'
        const { data } = await api.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return data
    } catch (error) {

        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El servidor no Responde")
    }
}

// subir estudiantes admitios
export async function uploadStudentsAdmitteds(file: File) {
    try {
        const formData = new FormData();
        formData.append('estudiantes_admitidos', file);

        const url = '/enroll/student/upload-admitteds'
        const { data } = await api.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return data
    } catch (error) {

        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El servidor no Responde")
    }
}

// mandar emails
export async function sendEmailsGrades() {
    try {
        const url = '/admission/send-emails'
        const { data } = await api.post(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El servidor no Responde")
    }
}

// obtener información de las inscripciones por id
export async function getInscriptionById(dni: string) {
    try {
        const url = `/admission/inscription/${dni}`
        const { data } = await api(url)

        const result = inscriptionSchema.safeParse(data)
        if (result.success) {
            return result.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El servidor no Responde")
    }
}

// obtener información de los resultados por id
export async function getResultById(dni: string) {
    try {
        const url = `/admission/viewresults/${dni}`
        const { data } = await api(url)

        const result = resultDetailSchema.safeParse(data)
        if (result.success) {
            return result.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El servidor no Responde")
    }
}