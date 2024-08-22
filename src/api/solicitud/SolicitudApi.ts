import { z } from 'zod';
import api  from "@/lib/axios";
import { CancelSchema, ChangeCenterSchema, ChangeCarerrSchema, RepPaymentSchema, ExceptSchema } from "@/types/request";
import { isAxiosError } from 'axios';

// Función para crear solicitud de cancelación
export async function createCancelApp(payload: z.infer<typeof CancelSchema>) {
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
export async function createChangeCenterApp(payload: z.infer<typeof ChangeCenterSchema>) {
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
export async function createChangeCarerrApp(payload: z.infer<typeof ChangeCarerrSchema>) {
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
export async function createRepPaymentApp(payload: z.infer<typeof RepPaymentSchema>) {
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
export async function createExceptApp(payload: z.infer<typeof ExceptSchema>) {
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
