import { PrivateRoutes } from "@/data/routes";
import { useAppStore } from "@/stores/appStore";
import { IconCirclePlusFilled, IconCircleXFilled } from "@tabler/icons-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function StudentEnroll() {
  const setTitle = useAppStore((state) => state.setTitle);

  useEffect(() => {
    setTitle("Matricula");
  }, [setTitle]);



  return (
    <div className=" px-2 md:px-6 pt-8">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to={`/myspace/${PrivateRoutes.STUDENT_ENROLL_ADD_CLASS}`} className=" p-3 bg-white shadow-md rounded-md flex gap-2 justify-between items-center transition-all  hover:scale-105 cursor-pointer">
          <h2 className=" text-gray-600 font-bold">Adicionar Asignatura</h2>
          <IconCirclePlusFilled className=" text-emerald-500" size="35px" />
        </Link>
        <Link to={`/myspace/${PrivateRoutes.STUDENT_ENROLL_CANCEL_CLASS}`} className="p-3 bg-white shadow-md rounded-md flex gap-2 justify-between items-center transition-all  hover:scale-105 cursor-pointer">
          <h2 className=" text-slate-600 font-bold">Cancelar Asignatura</h2>
          <IconCircleXFilled className=" text-rose-500" size="35px" />
        </Link>
      </div>
    </div>
  );
}
