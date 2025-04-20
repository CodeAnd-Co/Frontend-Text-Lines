import React, { useState } from 'react';
import ModalFlotante from '../componentes/organismos/ModalFlotante';
import Texto from '../componentes/atomos/Texto';

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
      <Texto>Aqui va el formulario</Texto>
    </ModalFlotante>
  );
};

export const Basico = Template.bind({});
Basico.args = {
  titulo: 'Formulario de prueba',
  confirmLabel: 'Guardar',
  cancelLabel: 'Cancelar',
};
