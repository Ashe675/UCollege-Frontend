
"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";


export default function ModalTeacher() {
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="purple" style={{marginLeft:"80vw"}}>Agregar Nuevo Docente</Button>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={emailInputRef}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Agregar Nuevo Docente</h3>
            <div>
                <div className="mb-2 block">
                  <Label htmlFor="text" value="Ingrese su Nombre Completo:" />
                  <TextInput id="text"  placeholder="Nombre Completo" required />
                </div>
                </div>
                <div className="mb-2 block">
                  <Label htmlFor="text" value="Ingrese su Número de Empleado:" />
                  <TextInput id="NumEmpl" placeholder="Ingrese Número de Empleado" type="text" required />
                </div>
                <div>
                    <Label htmlFor="text" value="Adjunte una foto:"/>
                    <input type="file" />
                </div>
                <div>
                  <Label htmlFor="text" value="Ingrese el Centro Regional al que pertenece:" />
                  <TextInput id="NumEmpl" placeholder="Centro Regional que pertenece" type="text" required />
                </div>
                <div>
                  <Label htmlFor="text" value="Ingrese el Departamento al que pertenece:" />
                  <TextInput id="NumEmpl" placeholder="Departamento que pertenece" type="text" required />
                </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button>Guardar</Button>
          <Button style={{backgroundColor:"red"}} onClick={() => setOpenModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
