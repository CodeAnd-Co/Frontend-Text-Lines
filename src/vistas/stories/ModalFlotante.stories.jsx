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

const Template = (args) => {
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState({ nombre: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    setOpen(false);
  };

  return (
    <ModalFlotante {...args} open={open} onClose={() => setOpen(false)} onConfirm={handleConfirm}>
      <CampoTexto
        label='Nombre'
        name='nombre'
        value={form.nombre}
        onChange={handleChange}
        fullWidth
        required
      />
    </ModalFlotante>
  );
};

export const Basico = Template.bind({});
Basico.args = {
  titulo: 'Formulario de prueba',
  confirmLabel: 'Guardar',
  cancelLabel: 'Cancelar',
};
