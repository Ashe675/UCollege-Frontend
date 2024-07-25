import api from "@/lib/axios";
import { EnumRoleSchema, EnumDeptSchema, addTeacherData } from "@/types/teacher";
import { isAxiosError } from "axios";

export async function createNewTeacher(formData: addTeacherData) {
    try {
        const { name, lastName: lastNames, photo, dni, phoneNumber, email } = formData
        const firstName = name.split(" ")[0]
        const middleName = name.split(" ")[1] ? name.split(" ")[1] : ""
        const secondLastName = lastNames.split(" ")[1] ? lastNames.split(" ")[1] : ""
        const lastName = lastNames.split(" ")[0]

        const form = new FormData();
        form.append('firstName', firstName);
        form.append('middleName', middleName);
        form.append('secondLastName', secondLastName);
        form.append('lastName', lastName);
        form.append('dni', dni);
        form.append('phoneNumber', phoneNumber);
        form.append('email', email);

        // Agregar el archivo photoCertificate
        if (photo) {
            form.append('photo', photo[0]);
           
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


//obtener los roles 
export async function getRole() {
    try{
        const url = '/admin/role'
        const {data} = await api(url)
        const result = EnumRoleSchema.safeParse(data)
        if (result.success){
            return result.data
        }
    } catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

//obtener los departamentos
export async function getDept() {
    try{
        const url = '/admin/role'
        const {data} = await api(url)
        const result = EnumDeptSchema.safeParse(data)
        if (result.success){
            return result.data
        }
    } catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}