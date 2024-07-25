import z from 'zod';

export type addTeacherData = {
    name: string,
    lastName: string,
    dni: string,
    photo: FileList | null,
    phoneNumber: string,
    email: string,
    role: string,
    dept: string,
}

export const addTeacherSchema = z.object({
    person: z.object({
        firstName: z.string(),
        middleName: z.string().nullable(),
        lastName: z.string(),
        secondLastName: z.string().nullable(),
        dni: z.string(),
        email: z.string().email(),
    }),
    dept: z.object({
        idDept: z.string(),
        nameDept: z.string(),
    }),
    role: z.object({
        idRole: z.string(),
        nameRole: z.string(),
    })
})


export type Teacher = z.infer<typeof addTeacherSchema>

//Esquema para los roles
const RoleSchema = z.object({
    enumRole: z.number(),
    nameRole: z.string(),
});

export const EnumRoleSchema = z.array(RoleSchema)
export type NameRoleSchema = z.infer<typeof RoleSchema>

//Esquema para los departamentos
const DepartmentSchema = z.object({
    id: z.number(),
    nameDep: z.string(),
});

export const EnumDeptSchema = z.array(RoleSchema)
export type NameDeptSchema = z.infer<typeof DepartmentSchema>