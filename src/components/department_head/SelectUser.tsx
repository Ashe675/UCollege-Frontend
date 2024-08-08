import { getTeachersByDepartment } from "@/api/department_head/DepartmentHeadApi";
import { useUserStore } from "@/stores/userStore";
import { ClassSectionForm, TeacherDepto } from "@/types/department_head";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

export default function SelectUser({
  setValue,
  name,
  initialState,
  disable
}: {
  setValue: UseFormSetValue<ClassSectionForm>;
  name: "teacherId";
  initialState? : Pick<TeacherDepto, 'id' | 'person'>
  disable? : boolean
}) {
  const initialValue = initialState?.id ? initialState : null
 

  const [selected, setSelected] = useState<Pick<TeacherDepto, 'id' | 'person'> | null>(initialValue);
  const user = useUserStore((state) => state.user);

  const { data, error } = useQuery({
    queryKey: ["teachers", "department", user.id],
    queryFn: getTeachersByDepartment,
  });

  if (error) console.log(error);

  useEffect(() => {
    if(!initialState){
      if (data && data.teachers.length > 0) {
        setSelected(data.teachers[0].teacher);
      }
    }
  }, [initialState, data]);

  
  useEffect(() => {
    if (selected) {
      setValue(name, selected.id);
    }
  }, [selected, setValue, name]);
  
  if (!data || data.teachers.length === 0) {
    return <div className=" bg-white rounded-lg pr-8 pl-3 text-slate-600 py-3 border border-slate-300">No hay maestros disponibles</div>;
  }

  return (
    <Listbox value={selected} defaultValue={selected} onChange={setSelected} disabled = {disable ? true : false}>
      <ListboxButton
        className={clsx(
          "relative block min-w-full w-full rounded-lg py-3 pr-8 pl-3 text-left text-sm/6 bg-white border border-slate-300 text-slate-600",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 "
        )}
      >
        {selected?.person.firstName} {selected?.person.lastName}
        <ChevronDownIcon
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
          aria-hidden="true"
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "w-[var(--button-width)] rounded-xl border border-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 bg-slate-200 min-w-64"
        )}
      >
        {data &&
          data.teachers.map((teacher) => (
            <ListboxOption
              key={teacher.teacher.id}
              value={teacher.teacher}
              className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none bg-slate-200 hover:bg-slate-100"
            >
              <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
              <div className=" ml-2 flex w-full gap-5 items-center">
                <Avatar img={teacher.teacher.images[0].url} size="md" rounded />
                <div className="text-sm/6 flex items-center text-slate-600">
                  {teacher.teacher.person.firstName}{" "}
                  {teacher.teacher.person.lastName}
                </div>
              </div>
            </ListboxOption>
          ))}
      </ListboxOptions>
    </Listbox>
  );
}
