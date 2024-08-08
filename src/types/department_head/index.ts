import { z } from "zod";

// Esquema para las imágenes
const ImageSchema = z.object({
    url: z.string(),
});

// Esquema para los datos personales
const PersonSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    dni: z.string(), // Validación para asegurarse de que el DNI solo contenga dígitos
});

// Esquema para el maestro
const TeacherSchema = z.object({
    id: z.number().int(),
    identificationCode: z.string(),
    personId: z.number().int(),
    active: z.boolean(),
    institutionalEmail: z.string(),
    verified: z.boolean(),
    description: z.string().nullable(), // Permitir null para la descripción
    roleId: z.number().int(),
    images: z.array(ImageSchema),
    person: PersonSchema,
});

// Esquema para el contenedor de teacher en el array teachers
const TeacherContainerSchema = z.object({
    teacher: TeacherSchema,
});

export type TeacherDepto = z.infer<typeof TeacherSchema>

// Esquema para el departamento
export const DepartmentSchema = z.object({
    departmentname: z.string(),
    teachers: z.array(TeacherContainerSchema),
});

export type TeacherByDepartment = z.infer<typeof DepartmentSchema>



export type ClassSectionForm = {
    IH: number;             // Hora inicial (Initial Hour)
    FH: number;             // Hora final (Final Hour)
    classId: number;        // Identificador de la clase
    teacherId: number;      // Identificador del docente
    classroomId: number;    // Identificador del aula
    days: number[];         // Días de la semana representados como un array de números
    quota: number;
    buildingId: number;          // Cupo máximo de estudiantes
}

export type NewSectionPayload = Omit<ClassSectionForm, 'buildingId'>


// * BUILDINGS
const ClassroomSchema = z.object({
    id: z.number(),
    code: z.string(),
    floor: z.number(),
    number: z.number(),
    capacity: z.number(),
    buildingId: z.number(),
});

const BuildingSchema = z.object({
    id: z.number(),
    code: z.string(),
    active: z.boolean(),
    regionalCenterId: z.number(),
    classrooms: z.array(ClassroomSchema),
});

export const BuildingsArraySchema = z.array(BuildingSchema);
export type Classroom = z.infer<typeof ClassroomSchema>;
export type Building = z.infer<typeof BuildingSchema>;
export type BuildingsArray = z.infer<typeof BuildingsArraySchema>;


const ClassSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    active: z.boolean(),
    createdAt: z.string(),
    code: z.string(),
    UV: z.number().int(),
    departamentId: z.number().int(),
});

export const ClassesArraySchema = z.object({
    classes: z.array(ClassSchema),
});

export type Class = z.infer<typeof ClassSchema>;
export type ClassesArray = z.infer<typeof ClassesArraySchema>;



const DaySchema = z.object({
    name: z.enum(["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"]),
});

const SectionDaySchema = z.object({
    day: DaySchema,
});

const PersonSchemaComplete = z.object({
    id: z.number().int(),
    dni: z.string(),
    firstName: z.string(),
    middleName: z.string().nullable(),
    lastName: z.string(),
    secondLastName: z.string().nullable(),
    phoneNumber: z.string(),
    email: z.string(),
});

const TeacherSchemaSections = z.object({
    institutionalEmail: z.string(),
    person: PersonSchemaComplete,
    id: z.number().int(),
    identificationCode: z.string(),
});

const BuildingSchemaSections = z.object({
    code: z.string(),
});

const ClassroomSchemaSections = z.object({
    code: z.string(),
    building: BuildingSchemaSections,
});

const SectionWithDetailsSchema = z.object({
    id: z.number().int(),
    code: z.string(),
    capacity: z.number().int(),
    IH: z.number().int(),
    FH: z.number().int(),
    justification: z.string().nullable(),
    active: z.boolean(),
    classId: z.number().int(),
    regionalCenter_Faculty_CareerId: z.number().int(),
    teacherId: z.number().int(),
    classroomId: z.number().int(),
    academicPeriodId: z.number().int(),
    section_Day: z.array(SectionDaySchema),
    classroom: ClassroomSchemaSections,
    teacher: TeacherSchemaSections,
    quotasAvailability: z.number(), // Asumiendo que los "matriculados" y "waitingList" son arrays de objetos desconocidos
    waitingListCount: z.number(),
});

export const DepartmentSchemaWithSections = z.object({
    departmentname: z.string(),
    sectionsWithDetails: z.array(SectionWithDetailsSchema),
});

// Tipos generados a partir de los esquemas
//   type Day = z.infer<typeof DaySchema>;
//   type SectionDay = z.infer<typeof SectionDaySchema>;
//   type Person = z.infer<typeof PersonSchemaComplete>;
//   type Teacher = z.infer<typeof TeacherSchemaSections>;
//   type Building = z.infer<typeof BuildingSchemaSections>;
//   type Classroom = z.infer<typeof ClassroomSchemaSections>;
export type SectionWithDetails = z.infer<typeof SectionWithDetailsSchema>;
export type DepartmentWithSections = z.infer<typeof DepartmentSchemaWithSections>;

// Esquema para `matriculados`
const matriculadoSchema = z.object({
    id: z.number(),
    identificationCode: z.string(),
    institutionalEmail: z.string(),
    avatar: z.string().nullable(),
    person: z.object({
        dni: z.string(),
        firstName: z.string(),
        middleName: z.string().nullable(),
        lastName: z.string(),
        secondLastName: z.string().nullable(),
    })
});

export type StudentsInSections = z.infer<typeof matriculadoSchema>

const BuildingSchemaSectionDetail = z.object({
    code: z.string(),
    id: z.number(),
});

const ClassroomSchemaSectionDetail = z.object({
    code: z.string(),
    capacity: z.number(),
    building: BuildingSchemaSectionDetail,
});

// Esquema para `class`
const classSchema = z.object({
    id: z.number(),
    name: z.string(),
    active: z.boolean(),
    createdAt: z.string(),
    code: z.string(),
    UV: z.number(),
    departamentId: z.number(),
});

const DaySchemaDetail = z.object({
    name: z.enum(["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"]),
    id: z.number()
});

const SectionDaySchemaDetail = z.object({
    day: DaySchemaDetail,
});

export const DetailSectionByIdSchema = z.object({
    id: z.number(),
    code: z.string(),
    capacity: z.number(),
    IH: z.number(),
    FH: z.number(),
    justification: z.string().nullable(),
    active: z.boolean(),
    classId: z.number(),
    regionalCenter_Faculty_CareerId: z.number(),
    teacherId: z.number(),
    classroomId: z.number(),
    academicPeriodId: z.number(),
    section_Day: z.array(SectionDaySchemaDetail),
    teacher: TeacherSchemaSections,
    classroom: ClassroomSchemaSectionDetail,
    class: classSchema,
    matriculados: z.array(matriculadoSchema),
    quotasAvailability: z.number(),
    waitingList: z.array(matriculadoSchema), // Ajusta esto según la estructura de `waitingList`
    waitingListCount: z.number()
});

export type SectionDetailById = z.infer<typeof DetailSectionByIdSchema>;

export type IncreaseQuota  = {
    increment : number
}

export type CancelSectionPayload  = {
    justification : string
}