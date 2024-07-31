import { toZonedTime, format, fromZonedTime } from 'date-fns-tz';

const timeZone = 'America/Tegucigalpa';

// Función para formatear la fecha y la hora
export function formatLatinaDateTime(dateStr: string): string {
    const date = new Date(dateStr);
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, 'dd/MM/yyyy hh:mm a', {timeZone})
}

export function toUTCDate(date : Date) : string {
    const utcDate = fromZonedTime(date, timeZone)
    return utcDate.toISOString()
}