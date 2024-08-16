import { getSectionSpaceById } from "@/api/teacher/TeacherApi";
import SectionVirtualSpace from "@/components/SectionSpace";
import Spinner from "@/components/spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function SectionSpaceView() {
  const params = useParams();
  const sectionId = params.sectionId!;

  const { data, isLoading, error } = useQuery({
    queryKey: ["space", "section", sectionId],
    queryFn: () => getSectionSpaceById(sectionId),
    retry: 2,
  });

  if (error) return <Navigate to={"/404"} />;

  if (isLoading)
    return (
      <div className=" w-full h-full flex items-center bg-primaryBlue">
        <Spinner />
      </div>
    );

  if (data) return <SectionVirtualSpace section={data} />;
}
