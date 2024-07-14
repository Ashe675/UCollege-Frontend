import Hero from "@/components/admission/Hero";
import LoginForm from "@/components/login/loginForm";


export default function Login() {
  return (
    <>
      <div style={{textAlign:"justify"}}>
      <Hero title="Iniciar Sesión" description="">
          <h3 style={{color:"white", fontWeight:"bolder"}}>Bienvenidos a UCollege</h3>
          <LoginForm/>
        </Hero>
      </div>
    </>
  );
}
