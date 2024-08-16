import { getStudentsEnrollmentsByDepartmentPage } from "@/api/department_head/DepartmentHeadApi";
import StudentsEnrollmemtsTable from "@/components/department_head/StudentsEnrollmemtsTable";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import { useUserStore } from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export default function EnrollStudentsView() {
  const location = useLocation();
  const user = useUserStore((state) => state.user);

  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const limit = 8;

  const { data, isLoading, error } = useQuery({
    queryKey: ["students", "deptos", user.id, page],
    queryFn: () => getStudentsEnrollmentsByDepartmentPage({ page, limit }),
    retry: false,
  });

  return (
    <div className=" w-full h-full bg-slate-100 p-5">
      <h2 className=" text-xl font-bold capitalize text-slate-600 text-center">
        Estudiantes Matriculados En el periodo actual
      </h2>
      {isLoading && (
        <div className=" flex mt-32 items-center justify-center">
          <Spinner />
        </div>
      )}
      {data && (
        <StudentsEnrollmemtsTable
          students={data.enrollments}
          page={page}
          count={data.pagination.totalPages}
        />
      )}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
}
