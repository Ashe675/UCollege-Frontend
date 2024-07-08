import ExamsCareerDetails from "./ExamsCareerDetails";
import type {InscriptionDetail}  from "@/types/admission";

const careeraNumber = [
    'Principal', 'Secundaria', 'Tercera' , 'Cuarta'
]

export default function ExamsDetails({inscription} : {inscription : InscriptionDetail}) {
  return (
    <div className=" bg-white shadow-md w-full h-full">
      <h1 className=" text-2xl font-bold text-slate-700 text-center p-3 uppercase">
        {inscription.person.firstName} {inscription.person.middleName} {inscription.person.lastName} {inscription.person.secondLastName}
      </h1>
      <p className=" text-slate-600 p-3">
        <span className=" font-bold">Número de Identidad: </span>
        {inscription.person.dni}
      </p>
      <p className=" text-slate-600 p-3">
        <span className=" font-bold">Correo Electrónico: </span>
        {inscription.person.email}
      </p>
      {inscription.careers.map((career, index) => (
        <ExamsCareerDetails careerNumber={careeraNumber[index]} key={career.name} career={career} />
      ))}
    </div>
  );
}
