import AddTeacher from "@/components/teacher/AddTeacherForm";

export default function AddTeacherForm(){
    return(
        <>
            <h1 className='flex container mx-auto font-semibold  p-3 pt-10 pl-10 text-4xl text-white'>Creando Docente</h1>
            <AddTeacher />
        </>
    );
}