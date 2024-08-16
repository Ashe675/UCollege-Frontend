import { StudentsInSections } from "@/types/department_head";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Avatar } from 'flowbite-react/components/Avatar';

type DisclosureStudentsProps = {
    students : StudentsInSections[],
    title : string
}

export default function DisclosureStudents({students, title} : DisclosureStudentsProps) {
  return (
    <Disclosure as="div" className="w-full bg-slate-200/70 rounded-md" >
      <DisclosureButton className="w-full flex justify-between font-bold text-white bg-blue-500 p-2 rounded-md uppercase">
        {title}
        <ChevronDownIcon className="size-6 fill-white group-data-[hover]:fill-slate-800 group-data-[open]:rotate-180" />
      </DisclosureButton>
      <div className="overflow-hidden py-2">
        <DisclosurePanel
        as="ul"
          transition
          className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0  p-2 space-y-2"
        >
          {students.length ? students.map(student => (
            <li key={student.id} className=" flex justify-between items-center text-slate-700 font-semibold bg-white p-2 rounded-md">
                <Avatar img={student.avatar ? student.avatar : ''} rounded/>
                <span>{student.identificationCode}</span>
                <span className=" capitalize">{student.person.firstName} {student.person.lastName}</span>
            </li>
          )) : <span className=" text-slate-600">No hay estudiantes</span>}
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
}
