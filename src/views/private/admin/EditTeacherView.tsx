import { getDepts, getRoles, getTeacherByCode } from "@/api/admin/AdminApi";
import EditTeacherForm from "@/components/admin/EditTeacherForm";
import Spinner from "@/components/spinner/Spinner";
import { PrivateRoutes } from "@/data/routes";
import { useAppStore } from "@/stores/appStore";
import { IconSquareXFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ButtonCustom from "../../../components/ButtonCustom";
import EditCenterForm from "@/components/admin/EditCenterForm";
import { getRoleMessage } from "@/utils/dictionaries";
import { DeleteTeacherModal } from '../../../components/admin/DeleteTeacherModal';

export default function EditTeacherView() {
  const params = useParams();
  const teacherCode = params.teacherCode!;
  const [canEdit, setCanEdit] = useState(false);
  const [canEditCenter, setcanEditCenter] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  const { data: regionalCenters } = useQuery({
    queryKey: ["regionalCentersFaculty"],
    queryFn: getDepts,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["teachers", teacherCode],
    queryFn: () => getTeacherByCode(teacherCode),
    retry: false,
  });

  const setTitle = useAppStore((state) => state.setTitle);
  useEffect(() => {
    setTitle("Docentes - Información docente");
  }, [setTitle]);

  const navigate = useNavigate();
  const [isGrown, setIsGrown] = useState(true);

  const handleToggle = () => {
    setIsGrown(!isGrown);
    setTimeout(() => {
      navigate(`/myspace/${PrivateRoutes.ADMIN_DOCENTES}`);
    }, 500);
  };

  if (isLoading)
    return (
      <div className=" w-full flex items-center  h-full bg-slate-100 p-5 text-slate-500">
        <Spinner />
      </div>
    );

  if (isError) return <Navigate to={"/404"} />;

  if (data && roles && regionalCenters)
    return (
      <div className=" w-full  h-full bg-slate-100 p-5 text-slate-500">
        <div
          className={`${
            isGrown ? " animate-grow" : "animate-shrink"
          } rounded-sm h-full bg-white shadow-md relative flex flex-col pb-2`}
        >
          <h2 className=" max-sm:text-left uppercase font-bold text-center bg-secondary p-4 text-white rounded-t-sm">
            Información del docente
          </h2>
          <IconSquareXFilled
            onClick={handleToggle}
            className=" text-red-600 absolute top-3 right-2 hover:cursor-pointer"
            size={30}
          />
          <div className=" p-3">
            <Avatar
              bordered
              color="purple"
              size="xl"
              rounded
              img={
                data.images?.length
                  ? data.images.find((img) => img.avatar)?.url
                  : ""
              }
            />
          </div>

          <div className="  p-4 max-lg:space-y-3 lg:space-x-3 grid grid-cols-1 lg:grid-cols-2 h-full  ">
            <div className=" space-y-3 h-full flex flex-col justify-between">
              <div className=" flex justify-between items-center space-x-2">
                <label
                  htmlFor="dni"
                  className=" font-bold block uppercase text-slate-700"
                >
                  Número de identidad
                </label>
                <div
                  id="dni"
                  className=" p-2 border rounded-sm border-slate-200 w-full bg-slate-200  max-w-[320px]"
                >
                  {data.dni}
                </div>
              </div>
              <div className=" flex justify-between items-center space-x-2">
                <label
                  htmlFor="numEmployee"
                  className=" font-bold block uppercase text-slate-700"
                >
                  Número de Empleado
                </label>
                <div
                  id="numEmployee"
                  className=" p-2 border rounded-sm border-slate-200 w-full bg-slate-200  max-w-[320px]"
                >
                  {data.identificationCode}
                </div>
              </div>
              {canEditCenter ? (
                <EditCenterForm
                  initialValues={{
                    regionalCenter: data.regionalCenter,
                    departament: data.departament,
                    role: data.role,
                  }}
                  roles={roles}
                  regionalCenters={regionalCenters}
                  canEdit={canEditCenter}
                  setCanEdit={setcanEditCenter}
                />
              ) : (
                <>
                  <div className=" flex justify-between items-center space-x-2">
                    <label
                      htmlFor="dni"
                      className=" font-bold block uppercase text-slate-700"
                    >
                      Centro Regional
                    </label>
                    <div
                      id="dni"
                      className=" p-2 border rounded-sm border-slate-200 w-full bg-slate-200  max-w-[320px]"
                    >
                      {data.regionalCenter.name}
                    </div>
                  </div>
                  <div className=" flex justify-between items-center space-x-2">
                    <label
                      htmlFor="dni"
                      className=" font-bold block uppercase text-slate-700"
                    >
                      Departamento
                    </label>
                    <div
                      id="dni"
                      className=" p-2 border rounded-sm border-slate-200 w-full bg-slate-200  max-w-[320px]"
                    >
                      {data.departament.name}
                    </div>
                  </div>
                  <div className=" flex justify-between items-center space-x-2">
                    <label
                      htmlFor="dni"
                      className=" font-bold block uppercase text-slate-700"
                    >
                      Cargo
                    </label>
                    <div
                      id="dni"
                      className=" p-2 border rounded-sm border-slate-200 w-full bg-slate-200  max-w-[320px]"
                    >
                      {getRoleMessage(data.role.name)}
                    </div>
                  </div>
                </>
              )}
            </div>
            <EditTeacherForm
              initialValues={data}
              canEdit={canEdit}
              setCanEdit={setCanEdit}
            />
          </div>
          <div className=" flex justify-around p-3 flex-wrap gap-3">
            <div
              className=" w-full max-w-[340px]"
              onClick={() => setcanEditCenter(true)}
              hidden={canEdit || canEditCenter}
            >
              <ButtonCustom className=" bg-teal-500 rounded-md w-full hover:bg-teal-600 ">
                Cambiar Cargo o Centro Regional
              </ButtonCustom>
            </div>
            <div
              className=" w-full max-w-[340px]"
              onClick={() => setCanEdit(true)}
              hidden={canEdit || canEditCenter}
            >
              <ButtonCustom className=" bg-orange-500 rounded-md  w-full hover:bg-orange-600 ">
                Editar
              </ButtonCustom>
            </div>
            <div
              className=" w-full max-w-[340px]"
              onClick={() => {
                console.log('ddd')
                setOpenModal(true)
              }}
              hidden={canEdit || canEditCenter}
            >
              <ButtonCustom className=" bg-red-500 rounded-md  w-full hover:bg-red-600 ">
                Eliminar
              </ButtonCustom>
            </div>
            <input
              hidden={!canEdit && !canEditCenter}
              type="submit"
              form={canEdit ? "formEditTeacher" : canEditCenter ? 'formEditCenterTeacher' : ''}
              value="Guardar Cambios"
              className="bg-green-500 max-w-[340px] w-full p-3 text-white uppercase font-bold hover:bg-green-400 cursor-pointer transition-colors rounded-md"
            />
            <div
              className=" w-full max-w-[340px]"
              onClick={() => {
                setCanEdit(false);
                setcanEditCenter(false);
                
              }}
              hidden={!canEdit && !canEditCenter}
            >
              <ButtonCustom className=" bg-red-500 rounded-md  w-full max-w-[300px] hover:bg-red-600 ">
                Cancelar
              </ButtonCustom>
            </div>
          </div>
        </div>
        <DeleteTeacherModal openModal = {openModal} setOpenModal = {setOpenModal} userId={data.user_id}/>
      </div>
    );
}
