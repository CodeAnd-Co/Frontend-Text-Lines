import React, { useState } from 'react';
import ModalFlotante from '../componentes/organismos/ModalFlotante';
import CampoTexto from '../componentes/atomos/CampoTexto';

export default {
  title: 'Componentes/Organismos/ModalFlotante',
  component: ModalFlotante,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export const ConBotonDeApertura = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nombre: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    setOpen(false);
  };

  return (
    <>
      <Boton label='Abrir Modal' variant='contained' onClick={() => setOpen(true)} />

      <ModalFlotante
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        titulo='Formulario de prueba'
        confirmLabel='Guardar'
        cancelLabel='Cancelar'
      >
        <CampoTexto
          label='Nombre'
          name='nombre'
          value={form.nombre}
          onChange={handleChange}
          fullWidth
          required
        />
      </ModalFlotante>
    </>
  );
};
