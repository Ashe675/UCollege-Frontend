import { RoleEnum } from "@/types/auth";

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
