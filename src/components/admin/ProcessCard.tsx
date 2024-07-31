import { Process } from "@/types/admin";
import { formatLatinaDateTime } from "@/utils/date";
import { getProcessAttributes } from "@/utils/dictionaries";

type ProcessCardProps = {
  process: Process;
  setProcessSelected: React.Dispatch<
    React.SetStateAction<
      | {
          id: number;
          startDate: string;
          finalDate: string;
          active: boolean;
          processTypeId: number;
          processId: number | null;
          planningId: number | null;
          processType: {
            name: string;
          };
        }
      | undefined
    >
  >;
};

export default function ProcessCard({
  process,
  setProcessSelected,
}: ProcessCardProps) {
  const attributes = getProcessAttributes(process.processType.name);

  return (
    <section
      onClick={() => setProcessSelected(process)}
      className={` rounded-md p-4 shadow-md font-bold w-full transition-all hover:scale-105 max-w-md hover:cursor-pointer hover:shadow-lg relative space-y-3 ${
        process.active ? "bg-white" : "bg-gray-300 text-white"
      }`}
    >
      <span
        className={` ${
          process.active ? `bg-${attributes.color}-500 text-white` : "bg-gray-400 text-white"
        }  p-2 rounded-full absolute right-3 top-3  text-lg`}
      >
        {<attributes.icon />}
      </span>
      <h2 className="text-xl mr-10">{process.processType.name}</h2>
      <div className="lg:pr-10 space-y-3">
        <div className={`p-1 pl-3 font-semibold flex justify-between items-center ${
          process.active ? "bg-sky-500 text-white" : "bg-gray-400 text-white"
        }  rounded-lg uppercase text-sm shadow-sm`}>
          Fecha Inicio:
          <span className={`p-1 px-2  rounded-lg shadow-inner ${
          process.active ? "bg-white text-slate-500 " : "bg-white text-gray-400"
        }`}>
            {formatLatinaDateTime(process.startDate)}
          </span>
        </div>
        <div className={`p-1 pl-3 font-semibold flex justify-between items-center ${
          process.active ? "bg-rose-500 text-white" : "bg-gray-400 text-white"
        }  rounded-lg uppercase text-sm shadow-sm`}>
          Fecha Fin:
          <span className={`p-1 px-2  rounded-lg shadow-inner ${
          process.active ? "bg-white text-slate-500 " : "bg-white text-gray-400"
        }`}>
            {formatLatinaDateTime(process.finalDate)}
          </span>
        </div>
      </div>
    </section>
  );
}
