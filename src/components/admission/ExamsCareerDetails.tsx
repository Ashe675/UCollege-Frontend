type ExamsCareerDetailsProps = {
  career: {
    name: string;
    tests: {
      name: string;
      code: string;
      minScore: number;
    }[];
  };
  careerNumber : string;
};

export default function ExamsCareerDetails({
  career,
  careerNumber
}: ExamsCareerDetailsProps) {
  return (
    <div className=" text-slate-600 p-3 ">
      <span className=" font-bold">Carrera {careerNumber}: </span>
      {career.name}
      <div className=" text-slate-600 pl-4 pt-1">
        <span className=" font-bold">Exámenes a realizar: </span>
        <ul className=" space-y-1">
          {career.tests.map((test) => (
            <li key={test.code} className=" bg-slate-100  p-2">
              <span className=" font-bold">{test.code}</span> - {test.name}
              <div>
                <span className=" font-bold">Requisito: </span>
                {test.minScore}
                Puntos
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
