import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const AdmissionLayout = lazy(
  () => import("./layouts/Admission/AdmissionLayout")
);
const InitialView = lazy(() => import("./views/admission/InitialView"));
const Inscripcion = lazy(() => import("./views/admission/Inscripcion"));
const Examenes = lazy(() => import("./views/admission/Examenes"));
const Resultados = lazy(() => import("./views/admission/Resultados"));
const Login = lazy(() => import("./views/auth/Login"));
import SpinnerFull from "./components/spinner/SpinnerFull";
import { PrivateRoutes, PublicRoutes } from "./data/routes";
import Protected from "./views/private/Protected";
import RoutesWithNotFound from "./utils/RoutesWithNotFound";
import AuthGuard from "./guards/AuthGuard";
const SelectCareerView = lazy(() => import("./views/auth/SelectCareerView"));
const NewPasswordView = lazy(() => import("./views/auth/NewPasswordView"));
const ForgotPassword = lazy(() => import("./views/auth/ForgotPassword"));
const AuthLayout = lazy(() => import("./layouts/auth/AuthLayout"));

export default function Router() {
  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        <Route
          element={
            <Suspense fallback={<SpinnerFull />}>
              <AdmissionLayout />
            </Suspense>
          }
        >
          <Route
            path={PublicRoutes.ADMISSION}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <InitialView />
              </Suspense>
            }
          ></Route>
          <Route
            path={PublicRoutes.ADMISSION_INSCRIPTION}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <Inscripcion />
              </Suspense>
            }
          ></Route>
          <Route
            path={PublicRoutes.ADMISSION_EXAMS}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <Examenes />
              </Suspense>
            }
          ></Route>
          <Route
            path={PublicRoutes.ADMISSION_RESULTS}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <Resultados />
              </Suspense>
            }
          ></Route>
        </Route>
        <Route
          element={
            <Suspense fallback={<SpinnerFull />}>
              <AuthLayout />
            </Suspense>
          }
        >
          <Route
            path={PublicRoutes.LOGIN}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path={PublicRoutes.FORGOT_PASSWORD}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <ForgotPassword />
              </Suspense>
            }
          ></Route>
          <Route
            path={PublicRoutes.NEW_PASSWORD}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <NewPasswordView />
              </Suspense>
            }
          />
          <Route
            path={PublicRoutes.SELECT_CAREER}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <SelectCareerView />
              </Suspense>
            }
          />
        </Route>
        <Route element={<AuthGuard />}>
          <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Protected />} />
        </Route>
        <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
      </RoutesWithNotFound>
    </BrowserRouter>
  );
}
