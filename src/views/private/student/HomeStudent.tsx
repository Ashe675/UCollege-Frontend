import { getClassesEnrollments } from "@/api/student/StudentApi";
import CardSectionHome from "@/components/CardSectionHome";
import Spinner from "@/components/spinner/Spinner";
import { useAppStore } from "@/stores/appStore";
import { useUserStore } from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function HomeStudent() {
  const setTitle = useAppStore((state) => state.setTitle);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    setTitle("INICIO");
  }, [setTitle]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["sectionsEnrollments", user.id],
    queryFn: getClassesEnrollments,
    retry: false,
  });

  if (data) console.log(data);

  if (error) console.log(error.message);

  return (
    <>
      <div className=" p-3 pt-20 bg-primaryBlue h-full  relative ">
        {isLoading && (
          <div className="  w-full h-1/2 flex items-center justify-center mt-20 ">
            <Spinner />
          </div>
        )}
        {data && !error && (
          <div className=" grid gap-5 grid-cols-1 lg:grid-cols-2 ">
            {data.map((sect) => (
              <CardSectionHome section={sect} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
