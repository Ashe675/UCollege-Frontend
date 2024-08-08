import { getTeachersByDepartment } from "@/api/department_head/DepartmentHeadApi";
import TeacherTableDepto from "@/components/department_head/TeacherTableDepto";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import { useAppStore } from "@/stores/appStore";
import { useUserStore } from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
export default function TeacherHeadView() {
  const user = useUserStore((state) => state.user);
  


  const {
    data: teachers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teachers", "Deptos", user.id],
    queryFn: getTeachersByDepartment,
  });

  const setTitle = useAppStore((state) => state.setTitle);
  useEffect(() => {
    setTitle("Docentes");
  }, [setTitle]);

  return (
    <div className=" w-full h-full bg-slate-100 p-5">
      {isLoading && (
        <div className=" flex mt-32 items-center justify-center">
          <Spinner />
        </div>
      )}
      {teachers && <TeacherTableDepto teachers={teachers} />}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
}
