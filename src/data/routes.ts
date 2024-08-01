export const PublicRoutes = {
    ADMISSION : '/admisiones',
    ADMISSION_INSCRIPTION : '/admisiones/inscripcion',
    ADMISSION_EXAMS : '/admisiones/examenes',
    ADMISSION_RESULTS : '/admisiones/resultados',
    LOGIN : '/auth/login',
    FORGOT_PASSWORD : '/auth/forgot-password',
    NEW_PASSWORD : '/auth/new-password/:token',
    SELECT_CAREER : '/auth/seleccionar-carrera'
}

export const PrivateRoutes = {
    PRIVATE : 'myspace',
    CHAT : 'chat',
    ADMIN_ADMISIONES : 'admin/admisiones',
    ADMIN_DOCENTES : 'admin/docentes',
    ADMIN_ADD_TEACHER : 'admin/docentes/registrar-docente',
    ADMIN_EDIT_TEACHER : 'admin/docentes/:teacherCode',
    ADMIN_CALENDARIZACION : 'admin/calendarizacion',
    ADMIN_CALENDARIZACION_CALENDARIO : 'admin/calendarizacion/calendario',
    ADMIN_ADD_PROCESS : 'admin/calendarizacion/nuevo-proceso',
    STUDENT_ENROLL : 'estudiante/matricula',
    STUDENT_ENROLL_ADD_CLASS : 'estudiante/matricula/matricular-clase',
    STUDENT_ENROLL_CANCEL_CLASS : 'estudiante/matricula/cancelar-clase',
}