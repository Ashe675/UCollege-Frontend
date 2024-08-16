import { getTeachersByDepartment } from "@/api/department_head/DepartmentHeadApi";
import { useUserStore } from "@/stores/userStore";
import { ClassSectionForm } from "@/types/department_head";
import { useQuery } from "@tanstack/react-query";
import { SearchSelect, SearchSelectItem } from "@tremor/react/";
import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

type SelectSearchUserProps = {
  setValue: UseFormSetValue<ClassSectionForm>;
  name: "teacherId";
  initialState?: string;
  disable?: boolean;
};

export default function SelectSearchUser({
  setValue,
  name,
  initialState,
  disable,
}: SelectSearchUserProps) {
  const user = useUserStore((state) => state.user);
  const initialValue = initialState ? initialState : "";
  const [selected, setSelected] = useState(initialValue);

  const { data, error } = useQuery({
    queryKey: ["teachers", "department", user.id],
    queryFn: getTeachersByDepartment,
  });

  if (error) console.log(error);

  useEffect(() => {
    if (selected) {
      setValue(name, Number(selected));
    }
  }, [selected, setValue, name]);

  if (!data || data.teachers.length === 0) {
    return (
      <div className=" bg-white rounded-lg pr-8 pl-3 text-slate-600 py-3 border border-slate-300">
        No hay maestros disponibles
      </div>
    );
  }

  return (
    <SearchSelect
      className=""
      value={selected}
      onValueChange={setSelected}
      defaultValue={selected}
      disabled={disable ? true : false}
    >
      {data &&
        data.teachers.map((teacher) => (
          <SearchSelectItem  className=" flex cursor-pointer items-center gap-2 hover:bg-slate-100 "
          
            key={teacher.teacher.id.toString()}
            value={teacher.teacher.id.toString()}
          >
            <Avatar
              img={
                teacher.teacher.images[0]?.url
                  ? teacher.teacher.images[0].url
                  : ""
              }
              size="md"
              rounded
            />
            <div className="text-sm/6 flex items-center text-slate-600">
              {teacher.teacher.person.firstName}{" "}
              {teacher.teacher.person.lastName}
            </div>
          </SearchSelectItem>
        ))}
    </SearchSelect>
  );
}
