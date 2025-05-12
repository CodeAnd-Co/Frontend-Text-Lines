import React, { useState } from 'react';
import { fn } from '@storybook/test';
import ModalFlotante from '../componentes/organismos/ModalFlotante';
import Texto from '../componentes/atomos/Texto';
import InfoUsuario from '../Componentes/Moleculas/InfoUsuario';

export default {
  title: '@Organismos/ModalFlotante',
  component: ModalFlotante,
  parameters: {
    layout: 'centered',
  },
};

// ----------------------
// Ejemplo Básico
// ----------------------
const TemplateBasico = (args) => {
  const [open, setOpen] = useState(true);

  const handleConfirm = () => {
    setOpen(false);
  };

  return (
    <ModalFlotante {...args} open={open} onClose={() => setOpen(false)} onConfirm={handleConfirm}>
      <Texto>Aquí va el formulario</Texto>
    </ModalFlotante>
  );
};

export const Basico = TemplateBasico.bind({});
Basico.args = {
  titulo: 'Formulario de prueba',
  confirmLabel: 'Guardar',
  cancelLabel: 'Cancelar',
};

// ----------------------
// Ejemplos con InfoUsuario
// ----------------------
const baseUsuario = {
  cliente: 'Toyota',
  rol: 'Supervisor',
  datosContacto: {
    email: 'example@gmail.com',
    telefono: '+98 765 4321',
    direccion: 'Av. Ejemplo 12, West B 34',
  },
  datosAdicionales: {
    nacimiento: '25 de marzo de 2025',
    genero: 'Masculino',
  },
  opcionesRol: [
    { value: 'Administrador', label: 'Administrador' },
    { value: 'Supervisor', label: 'Supervisor' },
    { value: 'Usuario', label: 'Usuario' },
  ],
};

const TemplateConInfoUsuario = (args) => {
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState({
    ...baseUsuario.datosContacto,
    rol: baseUsuario.rol,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    console.log('Datos guardados:', form);
    setOpen(false);
  };

  return (
    <ModalFlotante {...args} open={open} onClose={() => setOpen(false)} onConfirm={handleConfirm}>
      <InfoUsuario
        modoEdicion={args.modoEdicion}
        cliente={baseUsuario.cliente}
        rol={form.rol}
        datosContacto={{
          email: form.email,
          telefono: form.telefono,
          direccion: form.direccion,
        }}
        datosAdicionales={baseUsuario.datosAdicionales}
        opcionesRol={baseUsuario.opcionesRol}
        onChange={handleChange}
        estadoUsuario={{
          label: 'Activo',
          color: 'primary',
          shape: 'circular',
          backgroundColor: 'rgba(24, 50, 165, 1)',
        }}
      />
    </ModalFlotante>
  );
};

export const ConInfoUsuarioLectura = TemplateConInfoUsuario.bind({});
ConInfoUsuarioLectura.args = {
  titulo: 'Datos del Usuario',
  tituloVariant: 'h4',
  modoEdicion: false,
  botones: [
    {
      label: 'Cancelar',
      variant: 'outlined',
      color: 'primary',
      size: 'medium',
      outlineColor: 'rgba(24, 50, 165, 1)',
      onClick: fn(),
    },
    {
      label: 'Editar',
      variant: 'contained',
      color: 'primary',
      size: 'medium',
      backgroundColor: 'rgba(24, 50, 165, 1)',
      onClick: fn(),
    },
  ],
};

export const ConInfoUsuarioEditable = TemplateConInfoUsuario.bind({});
ConInfoUsuarioEditable.args = {
  titulo: 'Editar Usuario',
  tituloVariant: 'h4',
  modoEdicion: true,
  botones: [
    {
      label: 'Cancelar',
      variant: 'outlined',
      color: 'primary',
      size: 'medium',
      outlineColor: 'rgba(24, 50, 165, 1)',
      onClick: fn(),
    },
    {
      label: 'Guardar',
      variant: 'contained',
      color: 'primary',
      size: 'medium',
      backgroundColor: 'rgba(24, 50, 165, 1)',
      onClick: fn(),
    },
  ],
};
