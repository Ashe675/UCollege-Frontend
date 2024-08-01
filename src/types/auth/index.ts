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
    jwtoken : z.string(),
    user : z.object({
        id : z.number(),
        verified : z.boolean()
    }),
    options : z.array(z.object({
        id : z.number(),
        regionalCenter_Faculty_Career : z.object({
            id: z.number(),
            career: z.object({
                name : z.string()
            })
        })
    })),
    regionalCenter : z.string(),
    avatar : z.string().nullable()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'institutionalEmail' | 'password'>

export const userSchema = authSchema.pick({
    id: true,
    role: true,
    institutionalEmail: true,
    person: true,
    avatar : true
})

export const loginUserSchema = authSchema.pick({jwtoken : true, user: true})
export type LoginUser = z.infer<typeof loginUserSchema>

export const optionsCareerStudentSchema = authSchema.pick({
    options : true,
    regionalCenter : true
})
export type OptionsCareerStudent = z.infer<typeof optionsCareerStudentSchema>
export type RegionalCenterFacultyCareerId = {
    optionId : string
}

type User = z.infer<typeof userSchema>
export type ForgotPasswordData = Pick<User, 'institutionalEmail'>

const newPasswordFormDataSchema = authSchema.pick({
    password : true,
    password_confirmation : true
})

export type NewPasswordFormData = z.infer<typeof newPasswordFormDataSchema>

export type UserData = Pick<User, 'id' | 'institutionalEmail' | 'role' | 'person' | 'avatar'>

