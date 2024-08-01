import { Process } from "@/types/admin";
import ProcessCard from "./ProcessCard";

type ProcessListProps = {
  processes: Process[];
  setProcessSelected: React.Dispatch<
    React.SetStateAction<
      | Process
      | undefined
    >
  >;
};

export default function ProcessList({ processes, setProcessSelected }: ProcessListProps) {
  return (
    <div className=" w-full  mx-auto font-bold text-slate-600 space-y-4 p-4 relative order-2 lg:order-1 mt-3">
      {processes.length ? (
        <>
          {processes.map((process) => (
            <ProcessCard key={process.id} process={process} setProcessSelected = {setProcessSelected} />
          ))}
        </>
      ) : (
        <div className=" h-full text-center text-slate-500">
          No hay procesos activos
        </div>
      )}
    </div>
  );
}
