//Registro de Docente
export type RegisterTeacher = {
    name: string;
    employeeNumber: number;
    photoCertificate: FileList | null;
    regionalCenterId: string; 
    departmentName: string;
}

