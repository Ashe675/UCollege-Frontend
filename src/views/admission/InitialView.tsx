import ListFacultyLogo from '@/components/admission/ListFacultyLogo';
import ListCardNavigate from '../../components/admission/ListCardNavigate';

export default function InitialView() {
  return (
    <>
        <h1 className=' container mx-auto font-semibold  p-3 pt-10 pl-10 text-4xl text-white'>Admisiones</h1>
        <ListCardNavigate/>
        
        <ListFacultyLogo/>
    </>
  )
}
