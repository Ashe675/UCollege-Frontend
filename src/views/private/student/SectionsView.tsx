import { PrivateRoutes } from "@/data/routes";
import { IconArrowBackUp } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function SectionsView() {
  return (
    <div className=" pt-8 px-2 md:px-6">
      <div className="flex justify-end w-full bg-transparent gap-5">
        <Link
          className="bg-indigo-600 text-white font-bold uppercase text-sm p-3 rounded-sm shadow-md flex gap-1 justify-between  hover:bg-indigo-700 transition-colors items-center"
          to={`/myspace/${PrivateRoutes.STUDENT_ENROLL_ADD_CLASS}`}
        >
          <IconArrowBackUp stroke={3} />
          Regresar
        </Link>
      </div>
      <div className=" mt-8 ">
        <h2 className=" font-bold text-xl text-slate-600">
          Secciones Disponibles
        </h2>
        
      </div>
    </div>
  );
}
