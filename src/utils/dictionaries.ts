import { RoleEnum } from "@/types/auth";
import { IconPencil, IconChartBar, IconSchool, IconTool, IconX, IconCalendarEvent, Icon, IconBookUpload } from '@tabler/icons-react';

const RoleMessages: { [key in RoleEnum]: string } = {
    [RoleEnum.DEPARTMENT_HEAD]: 'Jefe de Departamento',
    [RoleEnum.COORDINATOR]: 'Coordinador',
    [RoleEnum.TEACHER]: 'Docente',
    [RoleEnum.STUDENT]: 'Estudiante',
    [RoleEnum.ADMIN]: 'Administrador',
};

const RoleColors: { [key in RoleEnum]: string } = {
    [RoleEnum.DEPARTMENT_HEAD]: ' bg-rose-500 ',
    [RoleEnum.COORDINATOR]: ' bg-blue-500',
    [RoleEnum.TEACHER]: ' bg-teal-500',
    [RoleEnum.STUDENT]: 'bg-yellow-500',
    [RoleEnum.ADMIN]: 'bg-green-500',
};

export const getRoleMessage = (role: RoleEnum): string => {
    return RoleMessages[role];
};

export const getRoleColorClass = (role: RoleEnum): string => {
    return RoleColors[role] || 'bg-gray-300'; // Clase por defecto
};



// Enum de tipos de procesos
enum ProcessType {
    INSCRIPCION = "INSCRIPCIÓN",
    RESULTADOS_INSCRIPCION = "RESULTADOS DE INSCRIPCIÓN",
    MATRICULA = "MATRÍCULA",
    ENTREGA_NOTAS = "ENTREGA DE NOTAS",
    PERIODO_ACADEMICO = "PERIODO ACADÉMICO",
    CREACION_SECCIONES = "CREACIÓN DE SECCIONES",
    CANCELACIONES_EXCEPCIONALES = "CANCELACIONES EXCEPCIONALES"
}

// Mapeo de colores e íconos
const processTypeAttributes: { [key in ProcessType]: { color: string, icon: Icon } } = {
    [ProcessType.INSCRIPCION]: { color: "blue", icon: IconPencil },
    [ProcessType.RESULTADOS_INSCRIPCION]: { color: "green", icon: IconChartBar },
    [ProcessType.MATRICULA]: { color: "orange", icon: IconSchool },
    [ProcessType.ENTREGA_NOTAS]: { color: "red", icon: IconBookUpload },
    [ProcessType.PERIODO_ACADEMICO]: { color: "cyan", icon: IconCalendarEvent },
    [ProcessType.CREACION_SECCIONES]: { color: "teal", icon: IconTool },
    [ProcessType.CANCELACIONES_EXCEPCIONALES]: { color: "brown", icon: IconX }
};

// Función para obtener el color e ícono de un tipo de proceso
export function getProcessAttributes(processTypeStr: string) {
    const processType = Object.values(ProcessType).find(pt => pt === processTypeStr);
    if (processType) {
        return processTypeAttributes[processType];
    } else {
        throw new Error(`Invalid process type: ${processTypeStr}`);
    }
}

export function abbreviateDays(days: string[]): string {
    const dayAbbreviations: { [key: string]: string } = {
        LUNES: "Lun",
        MARTES: "Mar",
        MIERCOLES: "Mié",
        JUEVES: "Jue",
        VIERNES: "Vie",
        SABADO: "Sáb",
        DOMINGO: "Dom"
    };

    return days.map(day => dayAbbreviations[day.toUpperCase()] || day).join(", ");
}
