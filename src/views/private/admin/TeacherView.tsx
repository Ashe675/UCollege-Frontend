import { getTeachersPagination } from "@/api/admin/AdminApi";
import TeacherTable from "@/components/admin/TeacherTable";
import Spinner from "@/components/spinner/Spinner";
import { PrivateRoutes } from "@/data/routes";
import { useAppStore } from "@/stores/appStore";
import { useUserStore } from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

export default function TeacherView() {
  const location = useLocation();
  const user = useUserStore((state) => state.user);

  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const limit = 8;

  const { data, isLoading, error } = useQuery({
    queryKey: ["teachers", page, user.id],
    queryFn: () => getTeachersPagination({ page, limit }),
  });

  const setTitle = useAppStore((state) => state.setTitle);
  useEffect(() => {
    setTitle("Docentes");
  }, [setTitle]);

  if (error) return <Navigate to={"/"} />;

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
      {data && (
        <TeacherTable
          teachers={data.teachers}
          count={data.pagination.totalPages}
          page={page}
        />
      )}
    </div>
  );
}
