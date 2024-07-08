import Hero from "@/components/admission/Hero";
import InscriptionForm from "@/components/admission/InscriptionForm";


export default function Inscripcion() {
  return (
    <Hero title="Inscripción" description="¡Inicia tu camino hacia el éxito! Completa nuestro formulario de
        inscripción y, una vez verificado, podrás consultar en nuestra página de
        exámenes los que te corresponden realizar. ¡No pierdas la oportunidad de
        avanzar en tu carrera académica y profesional!">
          <InscriptionForm/>
    </Hero>
  );
}
