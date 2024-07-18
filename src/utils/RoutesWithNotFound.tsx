import SpinnerFull from "@/components/spinner/SpinnerFull"
import NotFound from "@/views/private/NotFound"
import { ReactNode, Suspense } from "react"
import { Route, Routes } from "react-router-dom"


type routesWithNotFoundProps ={
    children : ReactNode
}

export default function RoutesWithNotFound({children} : routesWithNotFoundProps) {
  return (
    <Routes>
        {children}
        <Route
          path="*"
          element={
            <Suspense fallback={<SpinnerFull />}>
              <NotFound />
            </Suspense>
          }
        />
    </Routes>
  )
}
