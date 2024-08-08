import { getClassesStats } from "@/api/department_head/DepartmentHeadApi";
import Dashboard from "@/components/department_head/DashBoard";

import SpinnerFull from "@/components/spinner/SpinnerFull";
import { useQuery } from "@tanstack/react-query";

export default function StatsView() {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: getClassesStats,
    retry: false,
  });

  return (
    <div className=" h-full w-full p-5 bg-primaryBlue">
      {data && <Dashboard data={data} />}
      {isLoading && <SpinnerFull/>}
    </div>
  );
}
