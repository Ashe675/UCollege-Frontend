export default function HeroProfile({
  fullName,
  isTheSameUser,
}: {
  fullName: string;
  isTheSameUser: boolean;
}) {
  return (
    <div className=" w-full px-10 pt-32 max-w-3xl">
      <h2 className=" text-4xl xl:text-5xl text-white font-semibold mb-3 ">
       {isTheSameUser ? ` Hola ${fullName}` : `Conozca el Perfil Universitario de ${fullName}`}
      </h2>
      {isTheSameUser ? (
        <p className=" text-white font-light text-pretty">
          Estamos encantados de tenerte aquí. Este es tu espacio personal donde
          podrás acceder a toda tu información. ¡Tu éxito es nuestro objetivo, y
          estamos aquí para apoyarte en cada paso del camino!
        </p>
      ) : (
        <p className=" text-white font-light text-pretty">
          Le damos la bienvenida al perfil de {fullName}, donde encontrará
          detalles sobre su experiencia académica, y sus intereses dentro de su
          carrera universitaria.
        </p>
      )}
    </div>
  );
}
