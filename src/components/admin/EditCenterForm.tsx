import { PrivateRoutes } from "@/data/routes";
import { getRoleMessage } from "@/utils/dictionaries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Department,
  ReginalCenterDepartmentsType,
  Roles,
  UpdateCenterData,
  UpdateCenterForm,
} from "../../types/admin/";
import { updateCenterTeacher } from "@/api/admin/AdminApi";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type EditCenterFormProps = {
  initialValues: UpdateCenterData;
  canEdit: boolean;
  setCanEdit: React.Dispatch<React.SetStateAction<boolean>>;
  roles: Roles;
  regionalCenters: ReginalCenterDepartmentsType[];
};

export default function EditCenterForm({
  initialValues,
  canEdit,
  setCanEdit,
  roles,
  regionalCenters,
}: EditCenterFormProps) {
  const params = useParams();
  const teacherCode = params.teacherCode!;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toastId = useRef<null | number | string>(null);

  let initialData: UpdateCenterForm = {
    regionalCenterId: initialValues.regionalCenter.id.toString(),
    roleId: initialValues.role.id.toString(),
    departamentId: initialValues.departament.id.toString(),
  };

  if (regionalCenters && roles) {
    initialData = {
      regionalCenterId: initialValues.regionalCenter.id.toString(),
      roleId: initialValues.role.id.toString(),
      departamentId: initialValues.departament.id.toString(),
    };
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<UpdateCenterForm>({ defaultValues: initialData });

  const regionalCenter = watch("regionalCenterId");
  const [deptos, setDeptos] = useState<Department[]>();
  const regionalCenterOptions = regionalCenters;

  useEffect(() => {
    const regionalId = parseInt(regionalCenter);
    if (!isNaN(regionalId)) {
      if (regionalCenterOptions && regionalCenter) {
        const options = regionalCenterOptions.find(
          (options) => options.id === +regionalCenter
        );
        if (options && options.departamentos.length) {
          setDeptos(options.departamentos);
        } else {
          setDeptos([]);
        }
      }
    }
  }, [regionalCenter, regionalCenterOptions]);

  const validateRole = (value: string) => {
    const id = parseInt(value);
    if (isNaN(id)) {
      return "Role Inválido";
    }
    return true;
  };

  const validateDepartment = (value: string) => {
    const id = parseInt(value);
    if (isNaN(id)) {
      return "Departamento Inválido";
    }
    return true;
  };

  const validateRegionalCenter = (value: string) => {
    const id = parseInt(value);
    if (isNaN(id)) {
      return "Centro Inválido";
    }
    return true;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateCenterTeacher,
    onError: (error) => {
      toast.update(toastId.current!, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      
    },
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      reset();
      queryClient.removeQueries({ queryKey: ["teachers", teacherCode] });
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      navigate(`/myspace/${PrivateRoutes.ADMIN_DOCENTES}/${teacherCode}`);
      setCanEdit(false);
    },
  });

  const handleUpdateCenter = (formData: UpdateCenterForm) => {
    toastId.current = toast.loading("Actualizando Docente...");
    mutate({ formData, teacherCode });
  };
  
  if(isPending) setCanEdit(false)

  if(initialValues)  
  return (
    <form
      onSubmit={handleSubmit(handleUpdateCenter)}
      noValidate
      id="formEditCenterTeacher"
      className="p-0 space-y-3  h-full w-full flex flex-col justify-between"
    >
      <div className=" space-y-1 flex flex-col">
        <div className=" flex  justify-between  items-center space-x-2">
          <label
            htmlFor="regionalCenterId"
            className="block text-center uppercase text-slate-600 font-bold"
          >
            Centro Regional
          </label>
          <select
            id="regionalCenterId"
            disabled={!canEdit}
            defaultValue={regionalCenters && initialData.regionalCenterId}
            className={` max-w-[320px] p-2 border rounded-sm border-slate-200 w-full ${
              canEdit ? "" : " bg-slate-200"
            }`}
            {...register("regionalCenterId", {
              required: "El centro regional es obligatorio",
              validate: validateRegionalCenter,
            })}
          >
            <option value="">
              ---Seleccione el Centro Regional al que pertenece---
            </option>
            {regionalCenters?.map((regionalCenter) => (
              <option key={regionalCenter.id} value={regionalCenter.id}>
                {regionalCenter.name}
              </option>
            ))}
          </select>
        </div>
        {errors.regionalCenterId && (
          <ErrorMessage>{errors.regionalCenterId.message}</ErrorMessage>
        )}
      </div>
      <div className=" space-y-1 flex flex-col">
        <div className=" flex  justify-between  items-center space-x-2">
          <label
            htmlFor="departamentId"
            className="block text-center uppercase text-slate-600 font-bold"
          >
            Departamento
          </label>
          <select
            id="departamentId"
            disabled={!regionalCenter || !canEdit}
            defaultValue={deptos && initialValues.departament.id}
            className={` max-w-[320px] p-2 border rounded-sm border-slate-200 w-full ${
              canEdit ? "" : " bg-slate-200"
            }`}
            {...register("departamentId", {
              required: "El departamento es obligatorio",
              validate: validateDepartment,
            })}
          >
            <option value="">
              ---Seleccione el Departamento al que pertenece---
            </option>
            {deptos?.map((depto) => (
              <option key={depto.Departament.id} value={depto.Departament.id}>
                {depto.Departament.name}
              </option>
            ))}
          </select>
        </div>
        {errors.departamentId && (
          <ErrorMessage>{errors.departamentId.message}</ErrorMessage>
        )}
      </div>
      <div className=" space-y-1 flex flex-col">
        <div className=" flex  justify-between  items-center space-x-2">
          <label
            htmlFor="roleId"
            className="block text-center uppercase text-slate-600 font-bold"
          >
            Cargo
          </label>
          <select
            id="roleId"
            disabled={!canEdit}
            className={` max-w-[320px] p-2 border rounded-sm border-slate-200 w-full ${
              canEdit ? "" : " bg-slate-200"
            }`}
            defaultValue={roles && initialData.roleId}
            {...register("roleId", {
              required: "El rol es obligatorio",
              validate: validateRole,
            })}
          >
            <option value="">---Seleccione el Rol del nuevo docente---</option>
            {roles &&
              roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {getRoleMessage(role.name)}
                </option>
              ))}
          </select>
        </div>
        {errors.roleId && <ErrorMessage>{errors.roleId.message}</ErrorMessage>}
      </div>
    </form>
  );
}
