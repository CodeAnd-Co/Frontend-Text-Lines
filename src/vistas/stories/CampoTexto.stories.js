import React from 'react';
import CampoTexto from '../componentes/Atomos/CampoTexto';

export default {
  title: 'Componentes/Átomos/CampoTexto',
  component: CampoTexto,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'date'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    margin: {
      control: { type: 'select' },
      options: ['none', 'dense', 'normal'],
    },
    fullWidth: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
  },
  args: {
    value: '',
    onChange: () => {},
  },
};

export const Basico = {
  args: {
    label: 'Nombre',
    placeholder: 'Escribe tu nombre',
  },
};

export const ConHelperText = {
  args: {
    label: 'Correo electrónico',
    type: 'email',
    helperText: 'Debe ser un correo válido',
    placeholder: 'correo@ejemplo.com',
  },
};

export const Requerido = {
  args: {
    label: 'Contraseña',
    type: 'password',
    required: true,
    placeholder: '••••••••',
  },
};

export const ConError = {
  args: {
    label: 'Teléfono',
    helperText: 'Número inválido',
    error: true,
    placeholder: '1234567890',
  },
};

export const Deshabilitado = {
  args: {
    label: 'Nombre',
    value: 'Texto fijo',
    disabled: true,
  },
};

export const FullWidth = {
  args: {
    label: 'Dirección completa',
    fullWidth: true,
    placeholder: 'Calle, número, ciudad',
  },
};
