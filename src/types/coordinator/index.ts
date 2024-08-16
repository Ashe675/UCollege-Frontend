import { z } from "zod";

const archivoSchema = z.string().url().nullable();

const classToCancelSchema = z.object({
    IH: z.number(), // Número de horas semanales
    FH: z.number(), // Número de horas finales
    code: z.string(), // Código de la clase
    classCode: z.string(), // Código corto de la clase
    className: z.string(), // Nombre de la clase
});

const solicitudSchema = z.object({
    id: z.number(), // ID de la solicitud
    date: z.string().datetime(), // Fecha en formato ISO
    justificacion: z.string(), // Justificación de la cancelación
    estado: z.enum(["PENDIENTE", "APROBADA", "RECHAZADA"]), // Estado de la solicitud
    studentName: z.string(), // Nombre del estudiante
    studentId: z.number(), // ID del estudiante
    identificationCode: z.string(), // Código de identificación del estudiante
    institutionalEmail: z.string().email(), // Email institucional del estudiante
    archivos: z.array(archivoSchema), // Lista de URLs de archivos
    classesToCancel: z.array(classToCancelSchema), // Lista de clases a cancelar
});


export type RequestCancelClass = z.infer<typeof solicitudSchema>

export const solicitudCancelSeccionSchema = z.object({
    data: z.array(solicitudSchema), // Lista de solicitudes
});

const CarreraSchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
});

const changeCareerSchema = z.object({
    id: z.number(),
    date: z.string().datetime(),
    justificacion: z.string(),
    estado: z.enum(["APROBADA", "RECHAZADA", "PENDIENTE"]), // Assuming there are other possible states
    studentName: z.string(),
    studentId: z.number(),
    identificationCode: z.string(),
    institutionalEmail: z.string(),
    CarreraActual: CarreraSchema,
    CarreraSolicitada: CarreraSchema,
    archivos: z.array(archivoSchema)
});

export type RequestChangeCareer = z.infer<typeof changeCareerSchema>

export const changeCareerSchemaArray = z.object({
    data: z.array(changeCareerSchema),
 });