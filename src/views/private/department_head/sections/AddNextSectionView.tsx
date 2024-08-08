import { PrivateRoutes } from "@/data/routes";
import { IconSquareXFilled } from "@tabler/icons-react";
import {useNavigate } from "react-router-dom";
import AddSectionForm from "../../../../components/department_head/AddSectionForm";
import { useEffect, useState } from "react";
import { useAppStore } from "@/stores/appStore";

export default function AddNextSectionView() {
  const setTitle = useAppStore((state) => state.setTitle);

  useEffect(() => {
    setTitle("Periodo - Próximo - Nueva Sección");
  }, [setTitle]);

  const navigate = useNavigate();
  const [isGrown, setIsGrown] = useState(true);

  const handleToggle = () => {
    setIsGrown(!isGrown);
    setTimeout(() => {
      navigate(`/myspace/${PrivateRoutes.DEPARTMENT_HEAD_PERIOD_NEXT}`);
    }, 500);
  };

  return (
    <div className=" p-5 ">
      <div
        className={`${
          isGrown ? "animate-grow" : "animate-shrink"
        } rounded-sm h-full bg-white shadow-md relative flex flex-col pb-2`}
      >
        <h2 className=" max-sm:text-left uppercase font-bold text-center bg-secondary p-4 text-white rounded-t-sm">
          Registrando Nueva Sección
        </h2>
        <IconSquareXFilled
          onClick={handleToggle}
          className=" text-red-600 absolute top-3 right-2 hover:cursor-pointer"
          size={30}
        />
        <AddSectionForm />
      </div>
    </div>
  );
}
