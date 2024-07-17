import { useUserStore } from "@/stores/userStore"
import { RoleEnum } from "@/types/auth"
import { Navigate, Outlet } from "react-router-dom"

type RoleGuardProps ={
    role : RoleEnum
}

export default function RoleGuard({role} :RoleGuardProps) {
    const user = useUserStore(state => state.user)
  return user.role.name === role ? <Outlet/> : <Navigate replace to={'404'}/>
}
