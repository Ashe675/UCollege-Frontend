import { ResultDetail } from "@/types/admission";
import CardResult from "./CardResult";

type ResultsDetailProps = {
  results: ResultDetail;
};

export default function ResultsDetail({ results }: ResultsDetailProps) {
  return (
    <div className=" bg-white shadow-md w-full h-full">
      <h1 className=" text-2xl font-bold text-slate-700 text-center p-3 uppercase">
        {results.person.firstName} {results.person.middleName}{" "}
        {results.person.lastName} {results.person.secondLastName}
      </h1>
      <p className=" text-slate-600 p-3">
        <span className=" font-bold">Número de Identidad: </span>
        {results.person.dni}
      </p>
      <p className=" text-slate-600 p-3">
        <span className=" font-bold">Correo Electrónico: </span>
        {results.person.email}
      </p>
      <div className=" space-y-2 flex gap-4 pb-4 flex-wrap justify-evenly">
        {results.results.map((result) => (
          <CardResult key={result.code} resultTest={result} />
        ))}
      </div>
      <div className={` text-center rounded-sm w-full p-5 uppercase font-bold text-white ${results.opinion.id === 4 ? 'bg-red-500' : 'bg-green-500' }`}>
        {results.opinion.message}
      </div>
    </div>
  );
}
