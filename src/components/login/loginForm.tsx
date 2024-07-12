import { useForm, SubmitHandler } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function loginForm(){
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = data => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" bg-white rounded-sm shadow-md p-4 space-y-6 mt-5 py-9 mb-12"
      >
      <div className=" space-y-1 flex flex-col">
        <label htmlFor="email" className=" font-bold block text-center uppercase text-slate-700">Correo Electrónico:</label>
        <input
          id="email"
          type="email"
          placeholder="example@example.com"
          className=" p-2"
          {...register('email', {
            required: 'El correo electrónico es requerido',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'El formato del correo electrónico no es válido'
            }
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div className=" space-y-1 flex flex-col">
        <label htmlFor="password" className=" font-bold block text-center uppercase text-slate-700">Contraseña:</label>
        <input
          id="password"
          type="password"
          placeholder="Ingrese contreseña"
          className=" p-2"
          {...register('password', {
            required: 'La contraseña es requerida',
            minLength: {
              value: 8,
              message: 'La contraseña debe tener al menos 8 caracteres'
            }
          })}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </div>

      <input
        type="submit"
        value="Inscribirse"
        className="bg-tertiary w-full p-3 text-white uppercase font-bold hover:bg-tertiary/80 cursor-pointer transition-colors"
      />
    </form>
  );
};

