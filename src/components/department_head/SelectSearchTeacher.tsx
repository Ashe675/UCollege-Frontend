import { getTeachersByDepartment } from "@/api/department_head/DepartmentHeadApi";
import { useUserStore } from "@/stores/userStore";
import { ClassSectionForm, TeacherDepto } from "@/types/department_head";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Avatar } from "flowbite-react/components/Avatar";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

type SelectSearchTeacherProps = {
  setValue: UseFormSetValue<ClassSectionForm>;
  name: "teacherId";
  initialState?: Pick<TeacherDepto, "id" | "person">;
  disable?: boolean;
};

export default function SelectSearchTeacher({
  setValue,
  name,
  initialState,
  disable,
}: SelectSearchTeacherProps) {
  const [query, setQuery] = useState("");

  const user = useUserStore((state) => state.user);
  const initialValue = initialState ? initialState : null;
  
  const [selected, setSelected] = useState<Pick<
    TeacherDepto,
    "id" | "person"
  > | null>(initialValue);

  const { data, error } = useQuery({
    queryKey: ["teachers", "department", user.id],
    queryFn: getTeachersByDepartment,
  });

  if (error) console.log(error);

  useEffect(() => {
    if (selected) {
      setValue(name, selected.id);
    }
  }, [selected, setValue, name]);

  if (!data || data.teachers.length === 0) {
    return (
      <div className=" bg-white rounded-lg pr-8 pl-3 text-slate-600 py-3 border border-slate-300">
        No hay maestros disponibles
      </div>
    );
  }

  const filteredPeople =
    query === ""
      ? data.teachers
      : data.teachers.filter((item) => {
          return (
            (item.teacher.person.firstName + " " + item.teacher.person.lastName)
              .toLowerCase()
              .includes(query.toLowerCase())
          );
        });

  return (
    <div>
      <Combobox
        value={selected}
        onChange={(value) => setSelected(value)}
        onClose={() => setQuery("")}
        disabled={disable ? true : false}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "relative block min-w-full w-full rounded-lg py-3 pr-8 pl-3 text-left text-sm/6 bg-white border border-slate-300 text-slate-600 placeholder:text-slate-600",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 "
            )}
            placeholder="---Seleccione un docente---"
            displayValue={(item : TeacherDepto ) => item ? item?.person.firstName + " " + item?.person.lastName : ''}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 text-sm/6 flex items-center text-slate-600" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--button-width)] rounded-xl border border-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 bg-slate-200 min-w-64 sm:min-w-[360px]  "
          )}
        >  
          {filteredPeople.length ? filteredPeople.map((person) => (
            <ComboboxOption
              key={person.teacher.id}
              value={person.teacher}
              className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none bg-slate-200 hover:bg-slate-100"
            >
              <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
              <div className=" ml-2 flex w-full gap-5 items-center">
                <Avatar
                  img={
                    person.teacher.images[0]?.url
                      ? person.teacher.images[0].url
                      : ""
                  }
                  size="md"
                  rounded
                />
                <div className="text-sm/6 flex items-center text-slate-600">
                  {person.teacher.person.firstName}{" "}
                  {person.teacher.person.lastName}
                </div>
              </div>
            </ComboboxOption>
          )) : (
            <div className="text-sm/6 flex items-center text-slate-600 p-2">
                  No se encontró resultados.
            </div>
          )}
        </ComboboxOptions>
   
      </Combobox>
    </div>
  );
}
