type FacultyLogoProps = {
  src: string;
  alt: string;
  className? : string;
};

export default function FacultyLogo({ src, alt, className }: FacultyLogoProps) {
  return <img src={src} alt={alt} className={className} />;
}
