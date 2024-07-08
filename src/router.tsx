import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdmissionLayout from "./layouts/Admission/AdmissionLayout";
import InitialView from "./views/admission/InitialView";
import Inscripcion from "./views/admission/Inscripcion";
import Examenes from "./views/admission/Examenes";
import Resultados from "./views/admission/Resultados";
import AdminAdmission from "./views/admin/AdminAdmission";

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AdmissionLayout/>}>
                <Route path="/admisiones" element={<InitialView/>}></Route>
                <Route path="/admisiones/inscripcion" element={<Inscripcion/>}></Route>
                <Route path="/admisiones/examenes" element={<Examenes/>}></Route>
                <Route path="/admisiones/resultados" element={<Resultados/>}></Route>
            </Route>
            <Route path="/admisiones/admin" element={<AdminAdmission/>}/>
        </Routes>
    </BrowserRouter>
  )
}
