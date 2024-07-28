import { getTeachers } from "@/api/admin/AdminApi";
import TeacherTable from "@/components/admin/TeacherTable";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import { PrivateRoutes } from "@/data/routes";
import { useAppStore } from "@/stores/appStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function TeacherView() {
  const {
    data: teachers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });
  const setTitle = useAppStore((state) => state.setTitle);
  useEffect(() => {
    setTitle("Docentes");
  }, [setTitle]);

  return (
    <div className=" w-full h-full bg-slate-100 p-5">
      <div className="flex justify-end w-full bg-transparent">
        <Link
          className="bg-tertiary text-white font-bold uppercase text-sm p-3 rounded-sm shadow-md  hover:bg-tertiary/90 transition-colors"
          to={`/myspace/${PrivateRoutes.ADMIN_ADD_TEACHER}`}
        >
          Registrar Nuevo Docente
        </Link>
      </div>
      {isLoading && (
        <div className=" flex mt-32 items-center justify-center">
          <Spinner />
        </div>
      )}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      {teachers && <TeacherTable teachers={teachers} />}
    </div>
  );
}
