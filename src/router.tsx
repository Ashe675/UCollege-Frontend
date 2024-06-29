import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hello from "./views/Hello";

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route>
                <Route path="/" element={<Hello/>}>

                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
