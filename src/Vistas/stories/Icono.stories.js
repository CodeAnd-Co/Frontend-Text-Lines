import React from 'react';
import { fn } from '@storybook/test';
import Icono from '@Atomos/Icono';

export default {
  title: 'Componentes/Átomos/Icono',
  component: Icono,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    nombre: {
      control: 'select',
      options: ['Home', 'Edit', 'Delete', 'Settings', 'Info', 'Search', 'Favorite', 'Add', 'Close'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'rounded', 'sharp', 'twoTone'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: [
        'inherit',
        'primary',
        'secondary',
        'action',
        'error',
        'disabled',
        'info',
        'success',
        'warning',
      ],
    },
    clickable: { control: 'boolean' },
    tooltip: { control: 'text' },
  },
  args: {
    nombre: 'Home',
    variant: 'filled',
    size: 'medium',
    color: 'primary',
    clickable: false,
    tooltip: '',
    onClick: fn(),
  },
};

export const Estático = {
  args: {
    nombre: 'Home',
    clickable: false,
  },
};

export const Clickeable = {
  args: {
    nombre: 'Edit',
    clickable: true,
    onClick: fn(),
  },
};

export const ConTooltip = {
  args: {
    nombre: 'Info',
    tooltip: 'Más información',
    clickable: true,
    onClick: fn(),
  },
};

export const BorrarOutlined = {
  args: {
    nombre: 'Delete',
    variant: 'outlined',
    color: 'error',
    clickable: true,
    onClick: fn(),
  },
};

export const FavoritoGrandeRounded = {
  args: {
    nombre: 'Favorite',
    variant: 'rounded',
    size: 'large',
    color: 'secondary',
    clickable: true,
  },
};
