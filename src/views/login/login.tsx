import Hero from "@/components/admission/Hero";
import LoginForm from "@/components/login/loginForm";


export default function Login() {
  return (
    <>
      <div style={{textAlign:"justify"}}>
        <Hero title="Inscripción" description="Bienvenidos a UCollege">
          <LoginForm/>
        </Hero>
      </div>
    </>
  );
}
