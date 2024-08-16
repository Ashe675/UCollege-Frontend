import { getClassesStats } from "@/api/department_head/DepartmentHeadApi";
import Dashboard from "@/components/department_head/DashBoard";
import ErrorMessage from "@/components/ErrorMessage";

import SpinnerFull from "@/components/spinner/SpinnerFull";
import { useUserStore } from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";

export default function StatsView() {
  const user = useUserStore(state => state.user)

  const { data, isLoading, error } = useQuery({
    queryKey: ["stats", user.id],
    queryFn: getClassesStats,
    retry: false,
  });

  return (
    <div className=" h-full w-full p-5 bg-primaryBlue">
      {data && <Dashboard data={data} />}
      {isLoading && <SpinnerFull/>}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
}
