import { ToolbarProps, View } from "react-big-calendar";

const messages  = {
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  work_week : 'T'
};

export const ToolBarCalendar = (props: ToolbarProps) => {
  const { label, onNavigate, onView, views, view } = props;

  const viewKeys = Array.isArray(views)
    ? views
    : (Object.keys(views) as View[]).filter((v) =>
        ["month", "week", "day", "agenda"].includes(v)
      );

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button onClick={() => onNavigate("PREV")}>{messages.previous}</button>
        <button onClick={() => onNavigate("NEXT")}>{messages.next}</button>
        <button onClick={() => onNavigate("TODAY")}>{messages.today}</button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group">
        {viewKeys.map((v) => (
          <button
            key={v}
            onClick={() => onView(v)}
            className={view === v ? "rbc-active" : ""}
          >
            {messages[v]}
          </button>
        ))}
      </span>
    </div>
  );
};
