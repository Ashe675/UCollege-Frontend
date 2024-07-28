import api from "@/lib/axios";
import { addTeacherData, teachersListSchema, rolesSchema, editTeacherSchema, regionalCenterDepartments, EditTeacherFormData,  UpdateTeacherData, UpdateCenterForm } from "@/types/admin";
import { isAxiosError } from "axios";

export async function createNewTeacher(formData: addTeacherData) {
    try {
        const { names, lastNames: lastNames, photo, dni, phoneNumber, email, role, regionalCenter, dept } = formData
        const firstName = names.split(" ")[0]
        const middleName = names.split(" ")[1] ? names.split(" ")[1] : ""
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
        form.append('roleId', role);
        form.append('regionalCenterId', regionalCenter);
        form.append('departamentId', dept);

        // Agregar el archivo photoCertificate
        if (photo) {
            form.append('avatar', photo[0]);
        }

        const url = '/admin/create-teacher'
        const { data } = await api.post(url, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("El servidor no Responde")
    }
}
// actualizar teacher
export async function updateTeacher({formData, teacherCode} : {formData : EditTeacherFormData, teacherCode : string}) {
    try{
        const [firstName, middleName] = formData.names.split(' ')
        const [lastName, secondLastName] = formData.lastNames.split(' ')

        const newTeacherData : UpdateTeacherData = {
            firstName,
            middleName : middleName ? middleName : '',
            lastName,
            secondLastName : secondLastName ? secondLastName : '',
            email : formData.email,
            phoneNumber : formData.phoneNumber,
            roleId : formData.roleId
        }
        const url = `/admin/teacher-update/${teacherCode}`
        const {data} = await api.put(url, newTeacherData)
        return data.message
    } catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

//obtener los roles 
export async function updateCenterTeacher ({formData, teacherCode} : {formData : UpdateCenterForm, teacherCode : string}) {
    try{
        const { roleId, departamentId, regionalCenterId }  = formData
        const payload = {
            roleId : +roleId,
            departamentId : +departamentId,
            regionalCenterId : +regionalCenterId
        }
        const url = `/admin/teachers/update-centers/${teacherCode}`
        const {data} = await api.put(url,payload)
        
        return data.message
    } catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

//obtener los roles 
export async function getRoles() {
    try{
        const url = '/admin/teacher/roles'
        const {data} = await api(url)
        const result = rolesSchema.safeParse(data)
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
export async function getDepts() {
    try{
        const url = '/admin/center/department'
        const {data} = await api(url)
        const result  = regionalCenterDepartments.safeParse(data)
        
        if(result.success){
            return result.data
        }
    } catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}


export async function getTeachers() {
    try{
        const url = '/admin/teachers'
        const {data} = await api(url)
        const result = teachersListSchema.safeParse(data)
        
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

export async function getTeacherByCode(code : string) {
    try{
        const url = `admin/teacher-by-code/${code}`
        const {data} = await api(url)
        const result = editTeacherSchema.safeParse(data)
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

export async function deleteTeacher(userId : number) {
    try{
        const url = `admin//teacher-delete/${userId}`
        const {data} = await api.delete(url)
        return data
    } catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw new Error("El Servidor no responde")
    }
}

