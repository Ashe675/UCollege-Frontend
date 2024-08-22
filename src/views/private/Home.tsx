import { getSectionsHomeStudent } from "@/api/student/StudentApi";
import { getSectionsHomeForTeacher } from "@/api/teacher/TeacherApi";
import CardSectionHome from "@/components/CardSectionHome";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import { useAppStore } from "@/stores/appStore";
import { useUserStore } from "@/stores/userStore";
import { IconUserShield } from "@tabler/icons-react";
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
    retry: 2,
  });

  if (user.role.name === "ADMIN")
    return (
      <div className="p-5 pt-16 flex-col gap-3 bg-primaryBlue h-full flex justify-center items-center  relative sm:px-7 text-4xl text-white font-black uppercase">
        {" "}
        Bienvenido Admin
        <IconUserShield stroke={2} size={200} />
      </div>
    );

  if (error)
    return (
      <div className=" p-5 pt-16 bg-primaryBlue h-full  relative sm:px-7">
        <ErrorMessage>{error.message}</ErrorMessage>
      </div>
    );

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
