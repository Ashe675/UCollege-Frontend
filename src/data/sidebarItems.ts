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
// {
//     icon: IconGraphFilled,
//     text: "Calificaciones",
//     link: "docente/calificaciones",
// },
]

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
                link: PrivateRoutes.PROFILE,
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
                {
                    icon: IconNotes,
                    text: "Matricula",
                    link: PrivateRoutes.DEPARTMENT_HEAD_ENROLLMENT,
                },
                {
                    icon: IconAddressBook,
                    text: "Historiales",
                    link: PrivateRoutes.DEPARTMENT_HEAD_HISTORY
                },
                {
                    icon: IconCalendarUser ,
                    text: "Docentes",
                    link: PrivateRoutes.DEPARTMENT_HEAD_TEACHERS,
                },
                {
                    icon: IconChartBar ,
                    text: "Estadísticas",
                    link: PrivateRoutes.DEPARTMENT_HEAD_STATS,
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
                    link: PrivateRoutes.COORDINATOR_ACADEMIC,
                },
                {
                    icon: IconMailForward,
                    text: "Solicitudes",
                    link: PrivateRoutes.COORDINATOR_REQUEST,
                },
                {
                    icon: IconAddressBook,
                    text: "Historiales",
                    link: PrivateRoutes.COORDINATOR_HISTORY,
                },
            ],
        }
    },
};