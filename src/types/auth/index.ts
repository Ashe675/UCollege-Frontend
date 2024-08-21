import z from 'zod';

//* Auth & Users

export const enum RoleEnum {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    DEPARTMENT_HEAD = "DEPARTMENT_HEAD",
    COORDINATOR = "COORDINATOR",
}


const authSchema = z.object({
    name: z.string(),
    email: z.string(),
    institutionalEmail: z.string(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string(),
    id: z.number(),
    role: z.object({
        name: z.string()
    }),
    person: z.object({
        firstName: z.string(),
        lastName: z.string()
    }),
    jwtoken: z.string(),
    user: z.object({
        id: z.number(),
        verified: z.boolean()
    }),
    options: z.array(z.object({
        id: z.number(),
        regionalCenter_Faculty_Career: z.object({
            id: z.number(),
            career: z.object({
                name: z.string()
            })
        })
    })),
    regionalCenter: z.string(),
    avatar: z.string().nullable()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'institutionalEmail' | 'password'>

export const userSchema = authSchema.pick({
    id: true,
    role: true,
    institutionalEmail: true,
    person: true,
    avatar: true
})

export const loginUserSchema = authSchema.pick({ jwtoken: true, user: true })
export type LoginUser = z.infer<typeof loginUserSchema>

export const optionsCareerStudentSchema = authSchema.pick({
    options: true,
    regionalCenter: true
})
export type OptionsCareerStudent = z.infer<typeof optionsCareerStudentSchema>
export type RegionalCenterFacultyCareerId = {
    optionId: string
}

type User = z.infer<typeof userSchema>
export type ForgotPasswordData = Pick<User, 'institutionalEmail'>

const newPasswordFormDataSchema = authSchema.pick({
    password: true,
    password_confirmation: true
})

export type NewPasswordFormData = z.infer<typeof newPasswordFormDataSchema>

export type UserData = Pick<User, 'id' | 'institutionalEmail' | 'role' | 'person' | 'avatar'>

// Esquema para 'images'
const imageSchema = z.object({
    id: z.number(),
    url: z.string(),
});

export type ImageData = z.infer<typeof imageSchema>

// Esquema para 'carrers'
const carrerSchema = z.object({
    id: z.number(),
    name: z.string(),
});

// Esquema para el objeto principal
export const profileSchema = z.object({
    userId: z.number(),
    dni: z.string(),
    firstName: z.string(),
    midleName: z.string().nullable(), // 'midleName' puede ser nulo
    lastName: z.string(),
    secondLastName: z.string().nullable(), // 'secondLastName' puede ser nulo
    email: z.string(),
    phone: z.string(), // Puedes añadir validaciones adicionales para el número de teléfono si es necesario
    identificationCode: z.string(),
    institutionalEmail: z.string(),
    regionalCenter: z.string(),
    avatar: z.string().nullable(),
    role: z.string(),
    depto: z.string().nullable(),
    active: z.boolean(),
    carrers: z.array(carrerSchema), // Es un array de objetos 'carrer'
    images: z.array(imageSchema), // Es un array de objetos 'image'
});