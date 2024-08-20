import { toZonedTime, format, fromZonedTime } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import { Message } from "@/types/chat";

const timeZone = 'America/Tegucigalpa';

// Función para formatear la fecha y la hora
export function formatLatinaDateTime(dateStr: string): string {
    const date = new Date(dateStr);
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, 'dd/MM/yyyy hh:mm a', { timeZone })
}

export function toUTCDate(date: Date): string {
    const utcDate = fromZonedTime(date, timeZone)
    return utcDate.toISOString()
}


export function convertTo12HourFormat(hour : number) {
    // Crear una nueva fecha con la hora especificada
    const date = new Date();
    date.setHours(hour, 0, 0); // Establecer la hora, minutos y segundos

    // Formatear la fecha en formato de 12 horas con AM/PM
    const formattedHour = format(date, 'h a'); // 'h a' da la hora en formato 12h con AM/PM

    return formattedHour.toUpperCase(); // Retornar en mayúsculas si prefieres AM/PM
}


export function groupMessagesByDate(messages: Message[]) {
  return messages.reduce((acc, message) => {
    const date = format(new Date(message.createdAt), 'PPPP', { locale: es }); // Formato de la fecha en español
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {} as Record<string, Message[]>);
}


export function formatLatinaHour(date: string | Date) {
    return format(new Date(date), "p"); // "p" muestra la hora en formato 12 horas, e.g., 3:30 PM
  }