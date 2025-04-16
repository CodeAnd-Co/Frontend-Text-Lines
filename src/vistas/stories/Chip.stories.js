import React from 'react';
import { fn } from '@storybook/test';
import Chip from '../componentes/atomos/Chip';

export default {
  title: 'Componentes/Átomos/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'success', 'warning', 'info'],
    },
    shape: {
      control: { type: 'select' },
      options: ['cuadrada', 'circular'],
    },
  },
};

export const Filled = {
  args: {
    label: 'Etiqueta',
    variant: 'filled',
    color: 'primary',
    size: 'medium',
    shape: 'cuadrada',
  },
};

export const Outlined = {
  args: {
    label: 'Etiqueta',
    variant: 'outlined',
    color: 'secondary',
    size: 'small',
    shape: 'cuadrada',
  },
};

export const Circular = {
  args: {
    label: 'Redondo',
    variant: 'filled',
    color: 'success',
    size: 'medium',
    shape: 'circular',
  },
};

export const CustomBackground = {
  args: {
    label: 'Personalizado',
    variant: 'filled',
    color: 'primary',
    shape: 'cuadrada',
    backgroundColor: '#f06292',
  },
};
