import SpinnerFull from "@/components/spinner/SpinnerFull";
import { PrivateRoutes } from "@/data/routes";
import RoutesWithNotFound from "@/utils/RoutesWithNotFound";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import RoleGuard from "../../guards/RoleGuard";
import { RoleEnum } from "@/types/auth";
const RequestAcademicView = lazy(() => import("./student/RequestAcademicView"));
const GradesStudentView = lazy(() => import("./student/GradesStudentView"));
const AcademicView = lazy(() => import("./coordinator/AcademicView"));
const RequestView = lazy(() => import("./coordinator/RequestView"));
const ProfileView = lazy(() => import("./ProfileView"));
const SectionSpaceView = lazy(() => import("./SectionSpaceView"));
const EnrollStudentsView = lazy(
  () => import("./department_head/EnrollStudentsView")
);
const TeacherHeadView = lazy(() => import("./department_head/TeacherHeadView"));
const AcademicHistoryView = lazy(
  () => import("./department_head/AcademicHistoryView")
);
const StatsView = lazy(() => import("./department_head/StatsView"));
const DetailNextSectionView = lazy(
  () => import("./department_head/sections/DetailNextSectionView")
);
const AddNextSectionView = lazy(
  () => import("./department_head/sections/AddNextSectionView")
);
const DetailSectionView = lazy(
  () => import("./department_head/sections/DetailSectionView")
);
const AddSectionView = lazy(
  () => import("./department_head/sections/AddSectionView")
);
const CurrentPeriodView = lazy(
  () => import("./department_head/CurrentPeriodView")
);
const NextPeriodView = lazy(() => import("./department_head/NextPeriodView"));
const PeriodView = lazy(() => import("./department_head/PeriodView"));
const CancelClassView = lazy(() => import("./student/CancelClassView"));
const EnrollAddClass = lazy(() => import("./student/EnrollAddClass"));
const StudentEnroll = lazy(() => import("./student/StudentEnroll"));
const CalendarProcessView = lazy(() => import("./admin/CalendarProcessView"));
const AddProcessView = lazy(() => import("./admin/AddProcessView"));
const ProcessView = lazy(() => import("./admin/ProcessView"));
const EditTeacherView = lazy(() => import("./admin/EditTeacherView"));
const AddTeacherView = lazy(() => import("./admin/AddTeacherView"));
const TeacherView = lazy(() => import("./admin/TeacherView"));
const Home = lazy(() => import("./Home"));
const AppLayout = lazy(() => import("@/layouts/App/AppLayout"));
const Chat = lazy(() => import("./Chat"));
const AdminAdmission = lazy(() => import("./admin/AdminAdmission"));

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
              <Home />
            </Suspense>
          }
        />
        <Route
          path={PrivateRoutes.PROFILE + "/:userId"}
          element={
            <Suspense fallback={<SpinnerFull />}>
              <ProfileView />
            </Suspense>
          }
        />
        <Route
          path={PrivateRoutes.SECTION + "/:sectionId"}
          element={
            <Suspense fallback={<SpinnerFull />}>
              <SectionSpaceView />
            </Suspense>
          }
        />
        <Route
          path={PrivateRoutes.CHAT + "/:conversationId?"}
          element={
            <Suspense fallback={<SpinnerFull />}>
              <Chat />
            </Suspense>
          }
        />
        <Route element={<RoleGuard role={RoleEnum.STUDENT} />}>
          <Route
            path={PrivateRoutes.STUDENT_ENROLL}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <StudentEnroll />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.STUDENT_REQUESTS}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <RequestAcademicView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.STUDENT_GRADES}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <GradesStudentView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.STUDENT_ENROLL_ADD_CLASS}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <EnrollAddClass />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.STUDENT_ENROLL_CANCEL_CLASS}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <CancelClassView />
              </Suspense>
            }
          />
        </Route>
        // * COORDINADOR
        <Route element={<RoleGuard role={RoleEnum.COORDINATOR} />}>
          <Route
            path={PrivateRoutes.COORDINATOR_HISTORY}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <AcademicHistoryView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.COORDINATOR_ACADEMIC}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <AcademicView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.COORDINATOR_REQUEST}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <RequestView />
              </Suspense>
            }
          />
        </Route>
        // * JEFE DEPARTAMENTO
        <Route element={<RoleGuard role={RoleEnum.DEPARTMENT_HEAD} />}>
          <Route
            path={PrivateRoutes.DEPARTMENT_HEAD_PERIOD}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <PeriodView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.DEPARTMENT_HEAD_ENROLLMENT}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <EnrollStudentsView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.DEPARTMENT_HEAD_HISTORY}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <AcademicHistoryView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.DEPARTMENT_HEAD_TEACHERS}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <TeacherHeadView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.DEPARTMENT_HEAD_STATS}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <StatsView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.DEPARTMENT_HEAD_PERIOD_CURRENT}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <CurrentPeriodView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.DEPARTMENT_HEAD_PERIOD_CURRENT_ADD_SECTION}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <AddSectionView />
              </Suspense>
            }
          />
          <Route
            path={
              PrivateRoutes.DEPARTMENT_HEAD_PERIOD_CURRENT_VIEW_SECTION +
              "/:sectionId"
            }
            element={
              <Suspense fallback={<SpinnerFull />}>
                <DetailSectionView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.DEPARTMENT_HEAD_PERIOD_NEXT}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <NextPeriodView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.DEPARTMENT_HEAD_PERIOD_NEXT_ADD_SECTION}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <AddNextSectionView />
              </Suspense>
            }
          />
          <Route
            path={
              PrivateRoutes.DEPARTMENT_HEAD_PERIOD_NEXT_VIEW_SECTION +
              "/:sectionId"
            }
            element={
              <Suspense fallback={<SpinnerFull />}>
                <DetailNextSectionView />
              </Suspense>
            }
          />
        </Route>
        <Route element={<RoleGuard role={RoleEnum.ADMIN} />}>
          <Route
            path={PrivateRoutes.ADMIN_ADMISIONES}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <AdminAdmission />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.ADMIN_DOCENTES}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <TeacherView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.ADMIN_ADD_TEACHER}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <AddTeacherView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.ADMIN_EDIT_TEACHER}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <EditTeacherView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.ADMIN_CALENDARIZACION}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <ProcessView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.ADMIN_ADD_PROCESS}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <AddProcessView />
              </Suspense>
            }
          />
          <Route
            path={PrivateRoutes.ADMIN_CALENDARIZACION_CALENDARIO}
            element={
              <Suspense fallback={<SpinnerFull />}>
                <CalendarProcessView />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </RoutesWithNotFound>
  );
}
