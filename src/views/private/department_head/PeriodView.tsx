import { IconCalendarClock, IconCalendarShare } from "@tabler/icons-react";
import OptionCard from "../../../components/OptionCard";
import { Link } from "react-router-dom";
import { PrivateRoutes } from "@/data/routes";
import { useEffect } from "react";
import { useAppStore } from "@/stores/appStore";

export default function PeriodView() {
  const setTitle = useAppStore((state) => state.setTitle);

  useEffect(() => {
    setTitle("Periodo");
  }, [setTitle]);

  return (
    <div className=" grid lg:grid-cols-2 grid-cols-1 gap-10 p-6">
      <Link to={`/myspace/${PrivateRoutes.DEPARTMENT_HEAD_PERIOD_CURRENT}`}>
        <OptionCard
          title="Periodo Actual"
          Icon={IconCalendarClock}
          color="emerald"
        />
      </Link>
      <Link to={`/myspace/${PrivateRoutes.DEPARTMENT_HEAD_PERIOD_NEXT}`}>
        <OptionCard
          title="Próximo Periodo"
          Icon={IconCalendarShare}
          color="blue"
        />
      </Link>
    </div>
  );
}
