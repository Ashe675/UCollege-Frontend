import { useAppStore } from "@/stores/appStore";
import { useEffect, useState } from "react";
import { IconSquareXFilled } from "@tabler/icons-react";
import AddTeacherForm from "@/components/admin/AddTeacherForm";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "@/data/routes";

export default function AddTeacherView() {
  const setTitle = useAppStore((state) => state.setTitle);
  
  useEffect(()=> {
    setTitle("Docentes - Registrar Docente");
  },[setTitle])

  const navigate = useNavigate();
  const [isGrown, setIsGrown] = useState(true);

  const handleToggle = () => {
    setIsGrown(!isGrown);
    setTimeout(() => {
      navigate(`/myspace/${PrivateRoutes.ADMIN_DOCENTES}`);
    }, 500);
  };

  return (
    <div className=" w-full  h-full bg-slate-100 p-5 text-slate-500">
      <div
        className={`${
          isGrown ? "animate-grow" : "animate-shrink"
        } rounded-sm h-full bg-white shadow-md relative flex flex-col pb-2`}
      >
        <h2 className=" max-sm:text-left uppercase font-bold text-center bg-secondary p-4 text-white rounded-t-sm">
          Registrando Nuevo docente
        </h2>
        <IconSquareXFilled
          onClick={handleToggle}
          className=" text-red-600 absolute top-3 right-2 hover:cursor-pointer"
          size={30}
        />
        
        <AddTeacherForm />
      </div>
    </div>
  );
}
