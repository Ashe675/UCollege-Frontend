import SpinnerFull from "@/components/spinner/SpinnerFull";
import { PrivateRoutes } from "@/data/routes";
import RoutesWithNotFound from "@/utils/RoutesWithNotFound";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import RoleGuard from "../../guards/RoleGuard";
import { RoleEnum } from "@/types/auth";
const HomeStudent = lazy(() => import("./student/HomeStudent"));
const AppLayout = lazy(() => import("@/layouts/App/AppLayout"));
const Chat = lazy(() => import("./Chat"));
const AdminAdmission = lazy(() => import("./admin/AdminAdmission"));
const TeacherView = lazy(() => import('@/views/Teacher/teacherView'));

export default function Protected() {
  return (
    <RoutesWithNotFound>
      <Route
        element={
          <Suspense fallback={<SpinnerFull />}>
            <AppLayout />
          </Suspense>
        }
      >
        <Route
          path="/"
          index
          element={
            <Suspense fallback={<SpinnerFull />}>
              <HomeStudent />
            </Suspense>
          }
        />
        <Route
          path={PrivateRoutes.CHAT}
          element={
            <Suspense fallback={<SpinnerFull />}>
              <Chat />
            </Suspense>
          }
        />
        <Route element={<RoleGuard role={RoleEnum.ADMIN} />}>
          <Route
            path={PrivateRoutes.ADMIN_ADMISIONES}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <AdminAdmission />
              </Suspense>
            }
          />
        </Route>
        <Route element={<RoleGuard role={RoleEnum.ADMIN} />}>
          <Route
            path={PrivateRoutes.TEACHER}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <TeacherView />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </RoutesWithNotFound>
  );
}
