import { getSectionsHomeStudent } from "@/api/student/StudentApi";
import { getSectionsHomeForTeacher } from "@/api/teacher/TeacherApi";
import CardSectionHome from "@/components/CardSectionHome";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import { useAppStore } from "@/stores/appStore";
import { useUserStore } from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Home() {
  const setTitle = useAppStore((state) => state.setTitle);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    setTitle("INICIO");
  }, [setTitle]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["sectionsHome", user.id],
    queryFn:
      user.role.name == "STUDENT"
        ? getSectionsHomeStudent
        : getSectionsHomeForTeacher,
    retry: false,
  });

  if (error) return  <div className=" p-5 pt-16 bg-primaryBlue h-full  relative sm:px-7"><ErrorMessage>{error.message}</ErrorMessage></div>

  return (
    <>
      <div className=" p-5 pt-16 bg-primaryBlue h-full  relative sm:px-7">
        {isLoading && (
          <div className="  w-full h-1/2 flex items-center justify-center mt-20 ">
            <Spinner />
          </div>
        )}
        {data && !error && (
          <div className=" grid gap-7 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ">
            {data.map((sect) => (
              <CardSectionHome key={sect.id} section={sect} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
