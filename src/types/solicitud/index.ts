import { z } from 'zod';


export const CancelSchema = z.object({
  active: z.boolean(),
  teacherId: z.number(),
  solicitudId: z.number(),
  motivo: z.string(),
});

export const ChangeCenterSchema = z.object({
  active: z.boolean(),
  teacherId: z.number(),
  solicitudId: z.number(),
  centroDestinoId: z.number(),
  motivo: z.string(),
});

export const ChangeCarerrSchema = z.object({
  active: z.boolean(),
  teacherId: z.number(),
  solicitudId: z.number(),
  nuevaCarreraId: z.number(),
  motivo: z.string(),
});

export const RepPaymentSchema = z.object({
  active: z.boolean(),
  solicitudId: z.number(),
  montoPago: z.number(),
  fechaPago: z.string().optional(),
  motivo: z.string(),
});

export const ExceptSchema = z.object({
  active: z.boolean(),
  justificacion: z.string(),
  sectionIds: z.number(),
  userId: z.number(),
  motivo: z.string(),
});

export type Cancelacion = z.infer<typeof CancelSchema>;
export type CambioCentro = z.infer<typeof ChangeCenterSchema>;
export type CambioCarrera = z.infer<typeof ChangeCarerrSchema>;
export type PagoReposicion = z.infer<typeof RepPaymentSchema>;
export type CancelacionExcepcional = z.infer<typeof ExceptSchema>;
