import z from 'zod';

// *Home
const DaySchema = z.object({
    name: z.string(),
});

const SectionDaySchema = z.object({
    day: DaySchema,
});

const ClassroomSchema = z.object({
    id: z.number(),
    code: z.string(),
    floor: z.number(),
    number: z.number(),
    capacity: z.number(),
    buildingId: z.number(),
    building: z.object({
        id: z.number(),
        code: z.string(),
        active: z.boolean(),
        regionalCenterId: z.number(),
        regionalCenter: z.object({
            id: z.number(),
            name: z.string(),
            date: z.string(),
            code: z.string(),
            finalDate: z.string().nullable(),
            townId: z.number(),
        }),
    }),
});

const CareerSchema = z.object({
    id: z.number(),
    name: z.string(),
    active: z.boolean(),
    createdAt: z.string(),
    description: z.string().nullable(),
    typeCareer: z.string(),
    code: z.string(),
});

const DepartamentSchema = z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.string(),
    active: z.boolean(),
    careerId: z.number(),
    career: CareerSchema,
});

const ClassSchema = z.object({
    id: z.number(),
    name: z.string(),
    active: z.boolean(),
    createdAt: z.string(),
    code: z.string(),
    UV: z.number(),
    departamentId: z.number(),
    departament: DepartamentSchema,
});

const FacultySchema = z.object({
    id: z.number(),
    name: z.string(),
    startDate: z.string(),
    finalDate: z.string().nullable(),
    active: z.boolean(),
});

// Definir el esquema para un recurso individual
const resourceSchema = z.object({
    id: z.number(),
    name: z.string(),
    publicId: z.string(),
    url: z.string().url(),
    frontSection: z.boolean(),
    type: z.enum(['PHOTO', 'VIDEO', 'DOCUMENT']), // Puedes ajustar los valores permitidos en 'type' según tu caso
    sectionId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

// Definir el esquema para el array de recursos
const resourcesSchema = z.array(resourceSchema);
export type ResourceType = z.infer<typeof resourceSchema>

const SectionSchema = z.object({
    id: z.number(),
    code: z.string(),
    capacity: z.number(),
    resources: resourcesSchema,
    IH: z.number(),
    FH: z.number(),
    justification: z.string().nullable(),
    active: z.boolean(),
    classId: z.number(),
    regionalCenter_Faculty_CareerId: z.number(),
    teacherId: z.number(),
    classroomId: z.number(),
    academicPeriodId: z.number(),
    section_Day: z.array(SectionDaySchema),
    class: ClassSchema,
    classroom: ClassroomSchema,
    factulty: FacultySchema,
});

const PersonSchema = z.object({
    dni: z.string(),
    firstName: z.string(),
    middleName: z.string().nullable(),
    lastName: z.string(),
    secondLastName: z.string().nullable(),
});

export enum ObservationEnum {
    APR = "APR",// Aprobado
    REP = "REP", // Reprobado
    ABD = "ABD", // Abandonado
    NSP = "NSP"// No se presentó
}

const StudentSchema = z.object({
    id: z.number(),
    identificationCode: z.string(),
    institutionalEmail: z.string(),
    avatar: z.string().nullable(),
    person: PersonSchema,
    grade : z.number().nullable(),
    OBS : z.enum([ObservationEnum.APR, ObservationEnum.REP, ObservationEnum.ABD, ObservationEnum.NSP]).nullable(),
});

export type StudentSectionMember = z.infer<typeof StudentSchema>

const ImageSchema = z.object({
    idImage: z.number(),
    publicId: z.string(),
    url: z.string(),
    userId: z.number(),
    avatar: z.boolean(),
    createdAt: z.string(),
});


const TeacherSchema = z.object({
    id: z.number(),
    identificationCode: z.string(),
    institutionalEmail: z.string(),
    person: PersonSchema,
    images: z.array(ImageSchema),
});

export type TeacherSectionMember = z.infer<typeof TeacherSchema>

export const SectionSpaceSchema = z.object({
    id: z.number(),
    code: z.string(),
    isSubmitGradeActive : z.boolean(),
    allNotesUpload : z.boolean(),
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
    resources: z.array(resourceSchema),
    section_Day: z.array(SectionDaySchema),
    class: ClassSchema,
    classroom: ClassroomSchema,
    matriculados: z.array(StudentSchema),
    waitingListStudents: z.array(StudentSchema),
    quotasAvailability: z.number(),
    factulty: FacultySchema,
    teacher: TeacherSchema
});


export type SectionSpace = z.infer<typeof SectionSpaceSchema>
export type SectionHome = z.infer<typeof SectionSchema>
export const SectionHomeArraySchema = z.array(SectionSchema);



export type UploadGradeForStudentForm = {
    grade: number,
    obs: ObservationEnum
}
