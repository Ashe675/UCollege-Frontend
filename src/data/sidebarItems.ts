import { PrivateRoutes } from "@/data/routes";
import {
    IconUserFilled,
    IconHomeFilled,
    IconMessageCircleFilled,
    IconGraphFilled,
    IconNotes,
    IconMailForward,
    IconAddressBook,
    IconClipboardData,
    IconClipboardList,
    IconChartBar,
    IconCalendarUser,
    IconWriting,
    IconUsersGroup,
    IconCalendarMonth,
} from "@tabler/icons-react";

const teacherItems = [{
    icon: IconMessageCircleFilled,
    text: "Chat",
    link: PrivateRoutes.CHAT,
},
{
    icon: IconGraphFilled,
    text: "Calificaciones",
    link: "docente/calificaciones",
},]

export const menuItems = {
    USER: {
        itemsPrincipals: [
            {
                icon: IconHomeFilled,
                text: "Inicio",
                link: `/${PrivateRoutes.PRIVATE}`,
            },
            {
                icon: IconUserFilled,
                text: "Mi Perfil",
                link: "perfil",
            },
        ],
        dropdown: {
            name: "",
            items: [
            ],
        }
    },
    STUDENT: {
        itemsPrincipals: [
            {
                icon: IconMessageCircleFilled,
                text: "Chat",
                link: PrivateRoutes.CHAT,
            },
        ],
        dropdown: {
            name: "Mis Estudios",
            items: [
                {
                    icon: IconNotes,
                    text: "Matricula",
                    link: "estudiante/matricula",
                },
                {
                    icon: IconGraphFilled,
                    text: "Calificaciones",
                    link: "estudiante/calificaciones",
                },
                {
                    icon: IconMailForward,
                    text: "Solicitudes",
                    link: "estudiante/solicitudes",
                },
            ],
        },
    },
    TEACHER: {
        itemsPrincipals: teacherItems,
        dropdown: {
            name: "",
            items: [],
        }
    },
    DEPARTMENT_HEAD: {
        itemsPrincipals: teacherItems,
        dropdown: {
            name: "Planificación",
            items: [
                {
                    icon: IconClipboardList,
                    text: "Periodo",
                    link:  PrivateRoutes.DEPARTMENT_HEAD_PERIOD,
                },
                // {
                //     icon: IconNotes,
                //     text: "Matricula",
                //     link: "jefe/matricula",
                // },
                {
                    icon: IconAddressBook,
                    text: "Historiales",
                    link: "jefe/historiales-academicos",
                },
                {
                    icon: IconCalendarUser ,
                    text: "Docentes",
                    link: "jefe/docentes",
                },
                {
                    icon: IconChartBar ,
                    text: "Estadísticas",
                    link: "jefe/estadisticas",
                },
            ],
        }
    },
    ADMIN: {
        itemsPrincipals: [
            {
                icon: IconCalendarMonth,
                text: "Calendarización",
                link: "admin/calendarizacion",
            },
            {
                icon: IconWriting,
                text: "Admisiones",
                link: PrivateRoutes.ADMIN_ADMISIONES,
            },
            {
                icon: IconUsersGroup,
                text: "Docentes",
                link: "admin/docentes",
            },
        ],
        dropdown: {
            name: "",
            items: [
            ],
        }
    },
    COORDINATOR: {
        itemsPrincipals: teacherItems,
        dropdown: {
            name: "Planificación",
            items: [
                {
                    icon: IconClipboardData,
                    text: "Carga Académica",
                    link: "coordinador/carga-academica",
                },
                {
                    icon: IconMailForward,
                    text: "Solicitudes",
                    link: "coordinador/solicitudes",
                },
                {
                    icon: IconAddressBook,
                    text: "Historiales",
                    link: "coordinador/historiales-academicos",
                },
            ],
        }
    },
};