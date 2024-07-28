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
}