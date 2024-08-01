import { DataEnrollClassesAvailability } from "@/types/student";

type ClassCardProps = {
  clas: DataEnrollClassesAvailability;
  onClick: () => void;
};

export default function ClassCard({ clas, onClick }: ClassCardProps) {
  return (
    <div
      className=" bg-white shadow-md rounded-md w-full p-3 transition-all  hover:scale-105 cursor-pointer "
      onClick={onClick}
    >
      <h3 className=" font-bold text-slate-600 text-lg uppercase ">
        {clas.name}
      </h3>
      <div className=" font-semibold mt-3 text-slate-500 uppercase flex gap-2 justify-between flex-wrap">
        <span>Código : {clas.code}</span>{" "}
        <span>Unidades Valorativas : {clas.uv}</span>{" "}
      </div>
    </div>
  );
}
