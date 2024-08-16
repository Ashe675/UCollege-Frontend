import { useUserStore } from "@/stores/userStore";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/auth/AuthApi";
import Spinner from "@/components/spinner/Spinner";
import { getFullName, isTheSameUser } from "@/utils/user";
import HeroProfile from "@/components/HeroProfile";
import { Avatar } from "flowbite-react/components/Avatar";
import { getRoleColorClass, getRoleMessage } from "@/utils/dictionaries";
import { RoleEnum } from "@/types/auth";

export default function ProfileView() {
  const params = useParams();
  const user = useUserStore((state) => state.user);
  const userId = params.userId ? Number(params.userId) : user.id;

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", "profile", userId],
    queryFn: () => getProfile(userId),
    retry: 2,
  });

  if (error) return <Navigate to={"/404"} />;

  if (isLoading)
    return (
      <div className=" w-full h-full  flex items-center bg-primaryBlue">
        <Spinner />
      </div>
    );

  if (profile)
    return (
      <>
        <div className=" w-full min-h-full z-[15] relative pb-16">
          <HeroProfile
            fullName={getFullName(profile.firstName, profile.lastName)}
            isTheSameUser={isTheSameUser(user.id, profile.userId)}
          />
          <div className=" px-10 mt-32 grid grid-cols-1 xl:grid-cols-3 h-full gap-6 flex-wrap">
            <div className=" bg-white w-full h-full max-h-[600px] xl:col-span-2 order-2 xl:order-1 rounded-md shadow-md pb-10"></div>
            <div className=" bg-white w-full h-full max-h-[600px] xl:col-span-1 order-1 xl:order-2 relative rounded-md pb-10 shadow-md">
              <div className="relative flex justify-center h-32">
                <Avatar
                  size={"xl"}
                  rounded
                  img={profile.avatar ? profile.avatar : ""}
                  className=" absolute -top-12 hover:-translate-y-2 transition-all"
                />
              </div>
              <div className=" text-slate-600 flex justify-center  flex-col items-center gap-3">
                <div className=" font-semibold text-lg">
                  {getFullName(
                    profile.firstName,
                    profile.midleName,
                    profile.lastName,
                    profile.secondLastName
                  )}
                </div>
                <div className=" ">{profile.institutionalEmail}</div>
                {profile.role === "STUDENT" && (
                  <div className=" ">
                    No. Cuenta : {profile.identificationCode}
                  </div>
                )}
                {profile.role === "STUDENT" && (
                  <div className=" ">{profile.carrers[0].name}</div>
                )}
                {profile.role !== "STUDENT" && (
                  <div className=" ">Departamento: {profile.depto}</div>
                )}
                {profile.role !== "STUDENT" && (
                  <div className=" ">
                    <span
                      className={` text-white px-2 py-1 rounded-sm ${getRoleColorClass(
                        profile.role as RoleEnum
                      )}`}
                    >
                      {getRoleMessage(profile.role as RoleEnum)}
                    </span>
                  </div>
                )}
                <div className=" ">{profile.regionalCenter}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-[5] bg-blue-950/90 h-2/3"></div>
        <img
          src="/bg-profile.jpg"
          className=" w-full object-cover inset-0 absolute -z-0 h-2/3 "
        />
        <div className=" h-1/3 w-full bg-slate-200 absolute bottom-0"></div>
      </>
    );
}
