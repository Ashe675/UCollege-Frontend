import { useUserStore } from "@/stores/userStore";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/auth/AuthApi";
import Spinner from "@/components/spinner/Spinner";
import { getFullName, isTheSameUser } from "@/utils/user";
import HeroProfile from "@/components/HeroProfile";
import { Avatar } from "flowbite-react/components/Avatar";
import { getRoleColorClass, getRoleMessage } from "@/utils/dictionaries";
import { ImageData, RoleEnum } from "@/types/auth";
import { IconPhotoUp, IconTrash, IconX } from "@tabler/icons-react";
import UploadImageProfile from "@/components/App/UploadImageProfile";
import { useState } from "react";
import ButtonCustomWithClick from "@/components/ButtonCustomWithClick";
import { Carousel } from "flowbite-react";
import ModalCustom from "@/components/ModalCustom";

export default function ProfileView() {
  const params = useParams();
  const user = useUserStore((state) => state.user);
  const userId = params.userId ? Number(params.userId) : user.id;
  const [uploadFile, setUploadFile] = useState(false);
  const [isAvatar, setIsAvatar] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const permitted = isTheSameUser(userId, user.id);
  const [imageActual, setImageActual] = useState(-1);
  const [imageToDelete, setImageToDelete] = useState<ImageData>();

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

  const handleDelete = () => {
    setImageToDelete(profile?.images[imageActual]);
    setModalDelete(true);
  };

  if (profile)
    return (
      <>
        <ModalCustom show={modalDelete} setShow={setModalDelete}>
          <div className=" text-center text-lg text-slate-600 font-semibold">¿Desea Eliminar La imagen?</div>
          <div className=" w-full flex justify-center items-center p-4">
            <img
              src={imageToDelete?.url}
              className="rounded-md relative max-h-[300px] object-contain"
            />
          </div>
          <ButtonCustomWithClick className="  text-white z-30 bg-red-500 text-sm   py-2 px-2 rounded-md hover:bg-red-600">
            Eliminar
          </ButtonCustomWithClick>
        </ModalCustom>
        <div className=" w-full min-h-full z-[15] relative pb-16">
          <HeroProfile
            fullName={getFullName(profile.firstName, profile.lastName)}
            isTheSameUser={permitted}
          />
          <div className=" px-10 mt-32 grid grid-cols-1 xl:grid-cols-3 h-full gap-6 flex-wrap">
            <div className=" bg-white w-full  relative min-h-[300px] h-full  xl:col-span-2 order-2 xl:order-1 rounded-md shadow-md  pb-10 p-5 flex flex-col pt-14">
              {permitted && (
                <>
                  <ButtonCustomWithClick
                    onClick={() => {
                      setUploadFile(!uploadFile);
                      setIsAvatar(false);
                    }}
                    className=" text-white bg-indigo-600 text-sm absolute top-1 right-1 max-w-10 py-2 px-2 rounded-md hover:bg-indigo-700"
                  >
                    {uploadFile ? (
                      <IconX stroke={2} />
                    ) : (
                      <IconPhotoUp stroke={2} />
                    )}
                  </ButtonCustomWithClick>

                  {uploadFile && (
                    <div className=" ">
                      <UploadImageProfile
                        avatar={isAvatar}
                        userId={userId}
                        setUploadFile={setUploadFile}
                      />
                    </div>
                  )}
                </>
              )}
              {profile.images.length ? (
                <div className="h-56 sm:h-80 xl:h-80 2xl:h-96 my-7 relative rounded-md ">
                  {permitted && (
                    <ButtonCustomWithClick
                      onClick={handleDelete}
                      className=" text-white z-30 bg-red-500 text-sm absolute top-1 right-1 max-w-10 py-2 px-2 rounded-md hover:bg-red-600"
                    >
                      <IconTrash stroke={2} title="Eliminar Foto" />
                    </ButtonCustomWithClick>
                  )}
                  <Carousel
                    slideInterval={5000}
                    className=" bg-black/90 rounded-md relative"
                    onSlideChange={(index) => setImageActual(index)}
                  >
                    {profile.images.map((img) => (
                      <img
                        src={img.url}
                        key={img.id}
                        className="rounded-md  max-h-[300px] object-contain"
                      />
                    ))}
                  </Carousel>
                </div>
              ) : (
                <div className=" h-full w-full flex justify-center items-center text-md text-slate-400 p-2">
                  El usuario aún no ha publicado imágenes.
                </div>
              )}
            </div>
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
