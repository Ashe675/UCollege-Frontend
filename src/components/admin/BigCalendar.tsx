import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Process } from "@/types/admin";
import  es  from "dayjs/locale/es";
import { ToolBarCalendar } from "./ToolBarCalendar";

dayjs.locale(es)

type BigCalendarProps = {
  process: Process[];
};

export const BigCalendar = ({ process }: BigCalendarProps) => {
  const localizer = dayjsLocalizer(dayjs);

  // Prepara los eventos para el calendario
  const events = process.map((p) => ({
    title: p.processType.name, // Asigna un título para el evento
    start: dayjs(p.startDate).toDate(), // Convierte startDate en un objeto Date
    end: dayjs(p.finalDate).toDate(), // Convierte finalDate en un objeto Date
    color: p.active ? "#10b981" : "#94a3b8", // Asigna color basado en el estado
  }));


  // Función para aplicar estilos personalizados
  const eventStyleGetter = (event: {
    title: string;
    start: Date;
    end: Date;
    color: string;
  }) => {
    const backgroundColor = event.color;
    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "5px",
        display: "block",
        padding: "2px", // Espaciado interno
        border: "1px solid #1e293b", // Borde alrededor del evento
        fontSize: "14px",
      },
    };
  };

  return (
    <div className=" w-full mt-7 h-5/6">
      <Calendar
        localizer={localizer}
        events={events}
        eventPropGetter={eventStyleGetter}
        startAccessor="start"
        endAccessor="end"
        components={{ toolbar: ToolBarCalendar }}
        className=" w-full mt-7 h-full"
      />
    </div>
  );
};
