import { z } from 'zod';


export const SolicitudCancelacionSchema = z.object({
  teacherId: z.number(),
  solicitudId: z.number(),
  motivo: z.string().optional(),
});

export const SolicitudCambioCentroSchema = z.object({
  teacherId: z.number(),
  solicitudId: z.number(),
  centroDestinoId: z.number(),
});

export const SolicitudCambioCarreraSchema = z.object({
  teacherId: z.number(),
  solicitudId: z.number(),
  nuevaCarreraId: z.number(),
});

export const SolicitudPagoReposicionSchema = z.object({
  solicitudId: z.number(),
  montoPago: z.number(),
  fechaPago: z.string().optional(),
});

export const SolicitudCancelacionExcepcionalSchema = z.object({
  justificacion: z.string(),
  sectionIds: z.array(z.number()),
  userId: z.number(),
});

export type Cancelacion = z.infer<typeof SolicitudCancelacionSchema>;
export type CambioCentro = z.infer<typeof SolicitudCambioCentroSchema>;
export type CambioCarrera = z.infer<typeof SolicitudCambioCarreraSchema>;
export type PagoReposicion = z.infer<typeof SolicitudPagoReposicionSchema>;
export type CancelacionExcepcional = z.infer<typeof SolicitudCancelacionExcepcionalSchema>;
