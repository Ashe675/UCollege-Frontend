import z from 'zod';

export const enum RoleEnum{
    ADMIN = "ADMIN",
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    DEPARTMENT_HEAD = "DEPARTMENT_HEAD",
    COORDINATOR = "COORDINATOR",
}

export const teacherSchema = z.object({
    photo:z.string(),
    name: z.string(),
    numberEmployee: z.number(),
    regionalCenter: z.string(),
    department:z.string(),
})

export type Teacher = z.infer<typeof teacherSchema>
