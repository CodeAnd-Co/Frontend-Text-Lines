import React from 'react';
import Cargador from '@Atomos/Cargador';

export default {
  title: 'Componentes/Átomos/Cargador',
  component: Cargador,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 10, max: 200, step: 5 },
    },
    thickness: {
      control: { type: 'number', min: 1, max: 10, step: 0.5 },
    },
    color: {
      control: { type: 'select' },
      options: ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'],
    },
  },
  args: {
    size: 40,
    thickness: 4,
    color: 'primary',
  },
};

export const PorDefecto = {};

export const Personalizado = {
  args: {
    size: 60,
    thickness: 6,
    color: 'success',
  },
};
