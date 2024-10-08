import z from 'zod';
import { ObservationEnum } from '../teacher';


// Definir el esquema para el profesor
const teacherSchema = z.object({
    firstName: z.string(),
    middleName: z.string().nullable(),
    lastName: z.string(),
    secondLastName: z.string().nullable()
});

// Definir el esquema para una sección
const sectionSchema = z.object({
    id: z.number(),
    code: z.string(),
    IH: z.number(),   // Hora de inicio
    FH: z.number(),
    waitingList: z.number(),   // Hora de finalización
    quotes: z.number(), // Número de cupos disponibles
    teacher: teacherSchema, // Información del profesor
    days: z.array(z.enum(["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"])),
    inEnrollment: z.boolean(),
    inWaitingList: z.boolean(),
});

export type SectionData = z.infer<typeof sectionSchema>

// Definir el esquema para una clase
const classSchema = z.object({
    id: z.number(),
    name: z.string(),
    uv: z.number(),    // Unidades de Valor
    code: z.string(),
    allReadyClassEnroll: z.boolean(),
    sections: z.array(sectionSchema) // Array de secciones
});

// Definir el esquema para un array de clases
export const classesSchema = z.array(classSchema);

export type DataEnrollClassesAvailabilityList = z.infer<typeof classesSchema>
export type DataEnrollClassesAvailability = z.infer<typeof classSchema>


export const sectionEnrollmentsSchema = z.array(
    z.object({
        classId: z.number(),
        className: z.string(),
        sectionCode: z.string(),
        HI: z.number(),
        HF: z.number(),
        teacher: teacherSchema,
        days: z.array(z.string()),
        sectionId: z.number(),
    })
);

const sectionEnrollmentSchema = z.object({
    classId: z.number(),
    className: z.string(),
    sectionCode: z.string(),
    HI: z.number(),
    HF: z.number(),
    teacher: teacherSchema,
    days: z.array(z.string()),
    sectionId: z.number(),
})

export type DataSectionEnrollment = z.infer<typeof sectionEnrollmentSchema>

export type DataSectionEnrollments = z.infer<typeof sectionEnrollmentsSchema>



const classGradeSchema = z.object({
    id: z.number(),
    name: z.string(),
    active: z.boolean(),
    createdAt: z.string(), // Puede ser `z.date()` si la fecha se está manejando como objeto Date en lugar de string
    code: z.string(),
    UV: z.number(),
    departamentId: z.number(),
});

const sectionGradeSchema = z.object({
    id: z.number(),
    code: z.string(),
    capacity: z.number(),
    IH: z.number(),
    FH: z.number(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    justification: z.string().nullable(),
    active: z.boolean(),
    classId: z.number(),
    regionalCenter_Faculty_CareerId: z.number(),
    teacherId: z.number(),
    classroomId: z.number(),
    academicPeriodId: z.number(),
    class: classGradeSchema,
});

const itemSchema = z.object({
    sectionCode: z.string(),
    section: sectionGradeSchema,
    teacherGrade: z.number().nullable(), // Puede ser ajustado según el tipo de dato real
    className: z.string(),
    nota: z.number().nullable(), // Puede ser ajustado según el tipo de dato real
    obs: z.enum([ObservationEnum.ABD, ObservationEnum.APR, ObservationEnum.NSP, ObservationEnum.REP]).nullable(), // Puede ser ajustado según el tipo de dato real
});

export type SectionGrade = z.infer<typeof itemSchema>

export const sectionsGradeSchema = z.array(itemSchema);