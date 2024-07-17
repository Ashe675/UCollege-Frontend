import { useAuth } from "@/hooks/useAuth";
import { useUserStore } from "@/stores/userStore";
import SpinnerFull from "@/components/spinner/SpinnerFull";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "@/data/routes";

export default function AuthGuard() {
  const setUser = useUserStore((state) => state.setUser);

  const { data: user, isLoading, isError } = useAuth();

  if (isLoading) return <SpinnerFull />;

  if (isError) return <Navigate to={PublicRoutes.LOGIN} />;

  if (user) {
    setUser(user);
  }

  if (user) return <Outlet />;
}
