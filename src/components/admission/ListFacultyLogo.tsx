import { Carousel } from "flowbite-react";

export function ListFacultyLogo() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={6000}>
        <img src="/Admissions/pumas.png" alt="Pumas" style={{width:"15%", marginTop:"0", alignItems:"center"}}/>
        <img src="/Admissions/Ingenieria-color.png" alt="Facultad" style={{width:"25%", marginTop:"0", alignItems:"center"}}/>
        <img src="/Admissions/Ciencias-Medicas-color.png" alt="Facultad" style={{width:"18%", marginTop:"0", alignItems:"center"}}/>
        <img src="/Admissions/Odontologia-color.png" alt="Facultad" style={{width:"25%", marginTop:"0", alignItems:"center"}}/>
        <img src="/Admissions/Quimica-y-Farmacia-color.png" alt="Facultad" style={{width:"25%", marginTop:"0", alignItems:"center"}}/>
        <img src="/Admissions/Humanidades-y-Artes-color.png" alt="Facultad" style={{width:"25%", marginTop:"0", alignItems:"center"}}/>
        <img src="/Admissions/Ciencias-Sociales-color.png" alt="Facultad" style={{width:"25%", marginTop:"0", alignItems:"center"}}/>
        <img src="/Admissions/Ciencias-Espaciales-color.png" alt="Facultad" style={{width:"25%", marginTop:"0", alignItems:"center"}}/>
        <img src="/Admissions/Ciencias-Juridicas-color.png" alt="Facultad" style={{width:"25%", marginTop:"0", alignItems:"center"}}/>
        <img src="/Admissions/Ciencias-Economicas-color.png" alt="Facultad" style={{width:"25%", marginTop:"0", alignItems:"center"}}/>
        <img src="/Admissions/Ciencias-color.png" alt="Facultad" style={{width:"25%", marginTop:"0", alignItems:"center"}}/>
      </Carousel>
    </div>
  );
}
