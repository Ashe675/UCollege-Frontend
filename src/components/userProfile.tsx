import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import userSchema from '@/types/profile';
import { Avatar, Button } from "flowbite-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './spinner/Spinner';

type UserRole = 'student' | 'admin' | 'teacher' | 'departmentHead' | 'coordinator';

type UserData = {
  firstName: string;
  lastName: string;
  institutionalEmail: string;
  regionalCenter: string;
  carerr: string;
  institutionalCode: string;
  role: UserRole; 
  description?: string; 
  academicIndex?: number; 
  photos?: File[]; 
};

export default function InfoUser() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [editedData, setEditedData] = useState<UserData | null>(null); 
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]); 

  const { data, isLoading, error } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
  });

  useEffect(() => {
    if (data) {
      const parsedData = userSchema.safeParse(data);
      if (parsedData.success) {
        const role: UserRole = (parsedData.data.role as UserRole) || 'student'; 
        setUserData({ ...parsedData.data, role });
        setEditedData({ ...parsedData.data, role });
        toast.success('Usuario leído correctamente');
      } else {
        toast.error('Error en el Servidor');
        console.error('Error en el Servidor', parsedData.error);
      }
    }

    if (error) {
      toast.error('Error en el Servidor');
    }
  }, [data, error]);

  async function fetchUserData() {
    const response = await fetch('/api/user'); // API de perfil
    if (!response.ok) {
      throw new Error('Error en el Servidor');
    }
    return response.json();
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
    toast.success('Cambios realizados correctamente');
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length > 3) {
        toast.error('Solo puedes subir 3 fotos');
        return;
      }
      setSelectedPhotos(files);
    }
  };

  if (isLoading) 
    return(
        <div className=" h-full flex items-center mt-60">
          <Spinner />
        </div>
      );

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <ToastContainer />
      <header className="w-full max-w-screen-lg text-center my-8 px-4 mb-10">
        <h1 className="text-5xl font-bold text-white text-left p-3">Hola {userData?.firstName} {userData?.lastName}</h1>
        <p className="text-base md:text-lg mb-6 text-white text-left pl-3">
          Bienvenido a tu página de Perfil.
        </p>
      </header>

      <div className="w-full max-w-screen-lg flex flex-col md:flex-row gap-6 md:gap-8">
        <section className="w-full md:w-2/3 bg-white text-gray-900 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl md:text-2xl text-slate-700 uppercase">Mi Perfil</h2>
            <Button 
              color="success" 
              onClick={isEditing ? handleCancel : handleEdit}
              className="bg-green-500 hover:bg-green-600 p-2 text-white rounded-md shadow-sm mt-4 font-bold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                <path d="M13.5 6.5l4 4" />
              </svg>
            </Button>
          </div>
          <h3 className="font-semibold text-slate-700 text-xs md:text-sm uppercase mt-3">Información de Usuario</h3>

          <form className="space-y-6 mt-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-left uppercase text-slate-600 font-bold">Nombre Completo</label>
                <input
                  type="text"
                  value={`${editedData?.firstName} ${editedData?.lastName}`}
                  disabled={!isEditing}
                  onChange={(e) => setEditedData(prev => prev ? { ...prev, firstName: e.target.value.split(' ')[0], lastName: e.target.value.split(' ')[1] } : prev)}
                  className="w-full p-2 text-slate-600 border border-slate-300 rounded-md py-3 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-left uppercase text-slate-600 font-bold">Correo Institucional</label>
                <input
                  type="email"
                  value={editedData?.institutionalEmail}
                  disabled={!isEditing}
                  onChange={(e) => setEditedData(prev => prev ? { ...prev, institutionalEmail: e.target.value } : prev)}
                  className="w-full p-2 text-slate-600 border border-slate-300 rounded-md py-3 text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-left uppercase text-slate-600 font-bold">Centro Regional</label>
              <input
                type="text"
                value={editedData?.regionalCenter}
                disabled={!isEditing}
                onChange={(e) => setEditedData(prev => prev ? { ...prev, regionalCenter: e.target.value } : prev)}
                className="w-full p-2 text-slate-600 border border-slate-300 rounded-md py-3 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-left uppercase text-slate-600 font-bold">Carrera</label>
              <input
                type="text"
                value={editedData?.carerr}
                disabled={!isEditing}
                onChange={(e) => setEditedData(prev => prev ? { ...prev, carerr: e.target.value } : prev)}
                className="w-full p-2 text-slate-600 border border-slate-300 rounded-md py-3 text-sm"
              />
            </div>
            {userData?.role === 'student' && (
              <>
                <div className="space-y-2">
                  <label className="block text-left uppercase text-slate-600 font-bold">Índice Académico</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editedData?.academicIndex || ''}
                    disabled={!isEditing}
                    onChange={(e) => setEditedData(prev => prev ? { ...prev, academicIndex: parseFloat(e.target.value) } : prev)}
                    className="w-full p-2 text-slate-600 border border-slate-300 rounded-md py-3 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-left uppercase text-slate-600 font-bold">Descripción Personal</label>
                  <textarea
                    value={editedData?.description || ''}
                    disabled={!isEditing}
                    onChange={(e) => setEditedData(prev => prev ? { ...prev, description: e.target.value } : prev)}
                    className="w-full p-2 text-slate-600 border border-slate-300 rounded-md py-3 text-sm"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-left uppercase text-slate-600 font-bold">Fotos (Máximo 3)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoChange}
                    className="w-full p-2 text-slate-600 border border-slate-300 rounded-md py-3 text-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  {selectedPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(photo)}
                      alt={`Foto ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  ))}
                </div>
              </>
            )}
          </form>

          {isEditing && (
            <div className="flex justify-end mt-6 space-x-4">
              <Button color="success" onClick={handleSave} className="bg-green-500 hover:bg-green-600 p-2 text-white rounded-sm shadow-md transition-colors duration-300 uppercase font-bold">Guardar Cambios</Button>
              <Button color="failure" onClick={handleCancel} className="bg-red-500 hover:bg-red-600 p-2 text-white rounded-sm shadow-md transition-colors duration-300 uppercase font-bold">Cancelar</Button>
            </div>
          )}
        </section>

        <section className="relative w-full md:w-1/3 bg-white text-gray-900 p-6 rounded-lg shadow-md text-center mt-10 md:mt-0">
          <div className="relative mb-4">
            <Avatar rounded size="xl" className="-mt-20" />
          </div>
          <div className="profile-details">
            <h3 className="text-lg md:text-xl font-bold">{userData?.firstName} {userData?.lastName}</h3>
            <h4 className="mt-4 block text-center uppercase text-slate-600 font-bold text-xs md:text-sm">
              {userData?.role === 'student' ? 'Número de Cuenta' : 'Número de Empleado'}
            </h4>
            <p className="mt-2">{userData?.institutionalCode}</p>
            <h4 className="mt-4 block text-center uppercase text-slate-600 font-bold text-xs md:text-sm">Carrera Principal</h4>
            <p className="mt-2">{userData?.carerr}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
