import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hello from "./views/Hello";
import AdmissionLayout from "./layouts/Admission/AdmissionLayout";

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AdmissionLayout/>}>
                <Route path="/admisiones" element={<Hello/>}>

                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
