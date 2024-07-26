// src/App.tsx
import { useState } from 'react';

export default function EditTeacherForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    console.log('Datos guardados:', formData);
  };

  return (
    <div className="p-4">
      <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4">Información de Docente</h1>
        <label
          htmlFor="name"
          className=" font-bold block text-center uppercase text-slate-700"
        >
          Nombres
        </label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombres Docente"
          onChange={handleInputChange}
          disabled={!isEditing}
          className="border p-2 mb-2 w-full"
        />

        <label
          htmlFor="lastName"
          className=" font-bold block text-center uppercase text-slate-700"
        >
          Apellidos
        </label>
        <input
          type="text"
          name="lastName"
          placeholder="Apellidos Docente"
          onChange={handleInputChange}
          disabled={!isEditing}
          className="border p-2 mb-2 w-full"
        />

        <label
              htmlFor="id"
              className=" font-bold block text-center uppercase text-slate-700"
            >
          Identidad
        </label>
        <input
          type="text"
          name="id"
          placeholder="Ejemplo: (0801199955221)"
          onChange={handleInputChange}
          disabled={!isEditing}
          className="border p-2 mb-2 w-full"
        />

        <label
              htmlFor="photo"
              className=" font-bold block text-center uppercase text-slate-700"
            >
          Foto de Docente
        </label>
        <input
          type="file"
          name="id"
          placeholder="Ejemplo: (0801199955221)"
          onChange={handleInputChange}
          disabled={!isEditing}
          className="border p-2 mb-2 w-full"
        />

        <label
              htmlFor="email"
              className=" font-bold block text-center uppercase text-slate-700"
            >
          Correo Personal Docente
        </label>
        <input
          type="mail"
          name="id"
          placeholder="example@example.com"
          onChange={handleInputChange}
          disabled={!isEditing}
          className="border p-2 mb-2 w-full"
        />

        <label
          htmlFor="regionalCenterId"
          className="block text-center uppercase text-slate-600 font-bold"
        >
          Departamento al que pertenece
        </label>
        <select
          id="roleId"
          className="p-2 text-slate-600"
          defaultValue={""}
        >
          <option value="">
            ---Seleccione el Departamento al que pertenece---
          </option>
        </select>

        <label
          htmlFor="regionalCenterId"
          className="block text-center uppercase text-slate-600 font-bold"
        >
          Rol al que pertenece
        </label>
        <select
          id="regionalCenterId"
          className="p-2 text-slate-600"
          defaultValue={""}
        >
          <option value="">
            ---Seleccione el Rol al que pertenece---
          </option>
        </select>

        <div className="flex justify-end space-x-2 mt-20">
          <button
            onClick={() => setIsEditing(true)}
            disabled={isEditing}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Editar
          </button>
          <button
            onClick={() => setIsEditing(false)}
            disabled={!isEditing}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Mostrar
          </button>
          <button
            onClick={handleSave}
            disabled={isEditing}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
