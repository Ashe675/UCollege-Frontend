import z from 'zod';
import { RoleEnum } from '../auth';
import { paginationEnrollmentSchema } from '../department_head';

export type addTeacherData = {
    names: string,
    lastNames: string,
    dni: string,
    photo: FileList | null,
    phoneNumber: string,
    email: string,
    regionalCenter: string,
    role: string,
    dept: string,
}

export type EditTeacherFormData = Pick<addTeacherData, 'names' | 'lastNames' | 'phoneNumber' | 'email'> & {
    roleId: number;
}

export type UpdateTeacherData = {
    firstName: string;
    middleName: string;
    lastName: string;
    secondLastName: string;
    email: string;
    phoneNumber: string;
    roleId: number;
}

export const adminSchema = z.object({
    person: z.object({
        firstName: z.string(),
        middleName: z.string().nullable(),
        lastName: z.string(),
        secondLastName: z.string().nullable(),
        dni: z.string(),
        email: z.string().email(),
    }),
    dept: z.object({
        id: z.string(),
        name: z.string(),
    }),
    role: z.object({
        id: z.string(),
        name: z.string(),
    })
})


//Esquema para los roles
export const rolesSchema = z.array(z.object({
    id: z.number(),
    name: z.enum([RoleEnum.DEPARTMENT_HEAD, RoleEnum.COORDINATOR, RoleEnum.TEACHER]),
}))
export type Roles = z.infer<typeof rolesSchema>

//Esquema para los departamentos
const DepartmentSchema = z.object({
    id: z.number(),
    nameDep: z.string(),
});

export type NameDeptSchema = z.infer<typeof DepartmentSchema>


// GET TEACHERS
// Esquema para el avatar, si existe
const AvatarSchema = z.object({
    url: z.string().url(), // Validación para URL válida
});

// Esquema para un usuario
const teacherSchema = z.object({
    user_id: z.number(), // ID del usuario, debe ser un número entero
    avatar: z.union([AvatarSchema, z.null()]), // Avatar puede ser un objeto o nulo
    firstName: z.string().min(1), // Nombre, debe ser una cadena no vacía
    middleName: z.string().optional().nullable(), // Segundo nombre es opcional
    lastName: z.string().min(1), // Apellido, debe ser una cadena no vacía
    secondLastName: z.string().optional().nullable(), // Segundo apellido es opcional
    regionalCenter: z.string().min(1), // Centro regional, debe ser una cadena no vacía
    departament: z.string().min(1), // Departamento, debe ser una cadena no vacía
    role: z.enum([RoleEnum.ADMIN, RoleEnum.COORDINATOR, RoleEnum.DEPARTMENT_HEAD, RoleEnum.TEACHER]), // Rol debe ser uno de los valores enumerados
    dni: z.string(), // DNI debe tener exactamente 13 caracteres
    identificationCode: z.string(), // Código de identificación debe tener exactamente 15 caracteres .length()
    active : z.boolean()
});

const regionalCenterFacultyCareerSchema = z.object({
    id: z.number().int(),
    name: z.string().min(1),
});

const departamentSchema = z.object({
    id: z.number().int(),
    name: z.string().min(1),
});

const roleSchema = z.object({
    id: z.number().int(),
    name: z.enum([RoleEnum.ADMIN, RoleEnum.COORDINATOR, RoleEnum.DEPARTMENT_HEAD, RoleEnum.TEACHER]),
});

// Esquema para una lista de maestros
export const teachersListSchema = z.array(teacherSchema);
export type TeacherList = z.infer<typeof teachersListSchema>

const imageSchema = z.object({
    idImage: z.number().int(),
    publicId: z.string(),
    url: z.string().url(),
    userId: z.number().int(),
    avatar: z.boolean(),
    createdAt: z.string().datetime(),
});

export const teachersListSchemaPagination = z.object({
    teachers : z.array(teacherSchema),
    pagination : paginationEnrollmentSchema
});


export const editTeacherSchema = z.object({
    user_id: z.number().int(), // Validar que sea un número entero
    images: z.array(imageSchema).optional(), // Arreglo de imágenes (puede ser vacío o contener objetos)
    firstName: z.string().min(1), // Validar que sea una cadena no vacía
    middleName: z.string().optional().nullable(), // Campo opcional
    lastName: z.string().min(1), // Validar que sea una cadena no vacía
    secondLastName: z.string().optional().nullable(), // Campo opcional
    regionalCenter: regionalCenterFacultyCareerSchema,
    departament: departamentSchema,
    role: roleSchema,
    dni: z.string(), // Validar que sea una cadena de dígitos
    identificationCode: z.string().length(15), // Validar que sea una cadena de exactamente 15 caracteres
    phoneNumber: z.string(),
    email: z.string().email(),
    active : z.boolean()
});

export type EditTeacherData = z.infer<typeof editTeacherSchema>

// Schema for Departament
const DepartamentSchema = z.object({
    id: z.number(),
    name: z.string(),
});

// Schema for Department wrapper
const DepartmentWrapperSchema = z.object({
    departmentId: z.number(),
    regionalCenter_Faculty_CareerId: z.number(),
    Departament: DepartamentSchema,
});

// Schema for Regional Center
const RegionalCenterSchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    departamentos: z.array(DepartmentWrapperSchema),
});

// Main schema for the array of regional centers
export const regionalCenterDepartments = z.array(RegionalCenterSchema);

export type ReginalCenterDepartmentsType = z.infer<typeof RegionalCenterSchema>

export type Department = z.infer<typeof DepartmentWrapperSchema>

export type UpdateCenterData = {
    role: {
        id: number,
        name: string
    },
    regionalCenter: {
        id: number,
        name: string
    },
    departament: {
        id: number,
        name: string
    }
}

export type UpdateCenterForm = {
    regionalCenterId: string,
    departamentId: string,
    roleId: string
}

export type UpdateRoleForm = {
    roleName: string
}

// Esquema para el objeto anidado processType
const processTypeSchema = z.object({
    name: z.string(),
});

// Esquema principal para los objetos
const processSchema = z.object({
    id: z.number(),
    startDate: z.string(), // Convertir la fecha en un objeto Date
    finalDate: z.string(), // Convertir la fecha en un objeto Date
    active: z.boolean(),
    processTypeId: z.number(),
    processId: z.number().nullable(),
    planningId: z.number().nullable(),
    processType: processTypeSchema,
});

export type Process = z.infer<typeof processSchema>

export type NewProcessFormData = Pick<Process, 'startDate' | 'finalDate'> & {
    processTypeId: number
}

export type Day = {
    startDate: string;
    finalDate: string;
    globalAvarage: number;
};

export type NewProcessEnrollFormData = {
    startDate: string;
    finalDate: string;
    processTypeId: number;
    days: Day[];
};

// Esquema para un array de estos objetos
export const processesSchema = z.array(processSchema);

export const extendFinalDateProcessSchema = processSchema.pick({ id: true, finalDate: true })
export type ExtendFinalDatePayload = z.infer<typeof extendFinalDateProcessSchema>

export type ProcessType = {
    id: number;
    name: string;
}