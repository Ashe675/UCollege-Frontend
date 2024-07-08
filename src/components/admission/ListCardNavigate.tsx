import CardNavigate from '@/components/admission/CardNavigate';
import { IconPencil, IconNotes, IconChecklist  } from '@tabler/icons-react';

export default function ListCardNavigate() {
  return (
    <div className="container  mx-auto p-10 px-4 sm:p-10 flex gap-8 flex-wrap">
      <CardNavigate
        href='inscripcion'
        title="Inscripción"
        description="¡Únete a nuestra universidad y construye tu futuro hoy mismo! "
        className=" bg-yellow-300"
      >
        <IconPencil size={24} stroke={2} />
      </CardNavigate>
      <CardNavigate
        href='examenes'
        title="Exámenes"
        description="Consulta tus exámenes aquí y toma el control de tu preparación. ¡Vamos juntos hacia el éxito académico!"
        className=" bg-orange-400"
      >
        <IconNotes size={24} stroke={2} />
      </CardNavigate>
      <CardNavigate
        href='resultados'
        title="Resultados"
        description="Revisa tus resultados aquí y descubre si has sido admitido. ¡Tu camino hacia el éxito comienza ahora!"
        className=" bg-rose-500"
      >
        <IconChecklist size={24} stroke={2} />
      </CardNavigate>
    </div>
  );
}
