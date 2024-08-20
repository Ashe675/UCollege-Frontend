import { z } from 'zod';
import api  from "@/lib/axios";
import { SolicitudCancelacionSchema, SolicitudCambioCentroSchema, SolicitudCambioCarreraSchema, SolicitudPagoReposicionSchema, SolicitudCancelacionExcepcionalSchema } from "@/types/solicitud";
import { isAxiosError } from 'axios';

// Función para crear solicitud de cancelación
export async function createCancelacionSolicitud(payload: z.infer<typeof SolicitudCancelacionSchema>) {
    try {
        const url = '/students/solicitudes/cancelacion';
        const { data } = await api.post(url, payload);
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("El Servidor no responde");
    }
}

// Función para crear solicitud de cambio de centro
export async function createCambioCentroSolicitud(payload: z.infer<typeof SolicitudCambioCentroSchema>) {
    try {
        const url = '/students/solicitudes/cambio-centro';
        const { data } = await api.post(url, payload);
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("El Servidor no responde");
    }
}

// Función para crear solicitud de cambio de carrera
export async function createCambioCarreraSolicitud(payload: z.infer<typeof SolicitudCambioCarreraSchema>) {
    try {
        const url = '/students/solicitudes/cambio-carrera';
        const { data } = await api.post(url, payload);
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("El Servidor no responde");
    }
}

// Función para crear solicitud de reposición de pago
export async function createPagoReposicionSolicitud(payload: z.infer<typeof SolicitudPagoReposicionSchema>) {
    try {
        const url = '/students/solicitudes/pago-reposicion';
        const { data } = await api.post(url, payload);
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("El Servidor no responde");
    }
}

// Función para crear solicitud de cancelación excepcional
export async function createCancelacionExcepcionalSolicitud(payload: z.infer<typeof SolicitudCancelacionExcepcionalSchema>) {
    try {
        const url = '/students/solicitudes/cancelacion-excepcional';
        const { data } = await api.post(url, payload);
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("El Servidor no responde");
    }
}
