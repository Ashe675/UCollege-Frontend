import { Carousel } from "flowbite-react";

export default function ListFacultyLogo() {
  const slides = [
    [
      "/Admissions/Ingenieria-color.png",
      "/Admissions/Ciencias-Medicas-color.png",
      "/Admissions/Odontologia-color.png",
      "/Admissions/Quimica-y-Farmacia-color.png"
    ],
    [
      "/Admissions/Humanidades-y-Artes-color.png",
      "/Admissions/Ciencias-Sociales-color.png",
      "/Admissions/Ciencias-Espaciales-color.png",
      "/Admissions/Ciencias-Juridicas-color.png"
    ],
    [
      "/Admissions/Ciencias-Economicas-color.png",
      "/Admissions/Ciencias-color.png"
    ]
  ];

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={2000}>
        {slides.map((slide, index) => (
          <div key={index} className="flex justify-center items-center space-x-4">
            {slide.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="Facultad"
                style={{
                  width: src.includes("Ciencias-Medicas-color") ? "15%" : "20%",
                  marginTop: "0",
                  alignItems: "center"
                }}
              />
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
