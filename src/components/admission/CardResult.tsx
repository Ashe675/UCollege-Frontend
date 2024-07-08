import type { ResultTest } from "@/types/admission"

export default function CardResult({resultTest} : {resultTest : ResultTest}) {
  return (
    <div className=" bg-white relative p-5 shadow-md w-full ">
        <div className={` absolute right-0 bottom-0 font-bold text-white text-sm ${resultTest.message.toUpperCase() === 'APROBADO' ? 'bg-green-500' : 'bg-red-500'} p-2 rounded-sm `}>
            {resultTest.message.toUpperCase()}
        </div>
        <div>
            <div className=" font-bold text-slate-600">EXAMEN: {resultTest.code}</div>
            <div className=" font-bold text-slate-600">{resultTest.testName}</div> 
            <div className=" font-bold text-slate-600">NOTA : {resultTest.score}</div>
        </div>
    </div>
  )
}
