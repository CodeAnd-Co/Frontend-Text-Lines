import { fn } from '@storybook/test';
import NavegadorAdministrador from '../componentes/organismos/NavegadorAdministrador';

export default {
  title: 'Componentes/organismos/NavegadorAdministrador',
  component: NavegadorAdministrador,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    nombreIcono: { control: 'text' },
    varianteIcono: {
      control: 'select',
      options: ['filled', 'outlined', 'rounded', 'sharp', 'twoTone'],
    },
    tamanoIcono: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    colorIcono: { control: 'color' },
    iconoClickeable: { control: 'boolean' },
    tooltipIcono: { control: 'text' },
    alturaImagen: { control: 'text' },
    anchoImagen: { control: 'text' },
    ajuste: {
      control: 'select',
      options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
    },
    clickeableImagen: { control: 'boolean' },
    estiloImagen: { control: 'object' },
    alClicImagen: { action: 'click en imagen' },
    alClicIcono: { action: 'click en icono' },
    informacionBotones: { control: 'object' },
  },
};

const botonesDemo = [
  {
    label: 'Inicio',
    variant: 'contained',
    color: 'primary',
    onClick: fn(),
  },
  {
    label: 'Configuración',
    variant: 'outlined',
    color: 'secondary',
    onClick: fn(),
  },
  {
    label: 'Cerrar sesión',
    variant: 'text',
    color: 'error',
    onClick: fn(),
  },
];

export const BarraEstándar = {
  args: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png',
    alt: 'Logo empresa',
    nombreIcono: 'Notifications',
    varianteIcono: 'filled',
    tamanoIcono: 'medium',
    colorIcono: '#1976d2',
    iconoClickeable: true,
    tooltipIcono: 'Notificaciones',
    alturaImagen: 'auto',
    anchoImagen: '100px',
    ajuste: 'contain',
    clickeableImagen: true,
    estiloImagen: { marginRight: '1rem' },
    alClicImagen: fn(),
    alClicIcono: fn(),
    informacionBotones: botonesDemo,
  },
};

export const SinAcciones = {
  args: {
    ...BarraEstándar.args,
    iconoClickeable: false,
    clickeableImagen: false,
    alClicImagen: undefined,
    alClicIcono: undefined,
  },
};

export const ConEstiloPersonalizado = {
  args: {
    ...BarraEstándar.args,
    colorIcono: '#ff9800',
    estiloImagen: { height: '50px', borderRadius: '8px' },
    alturaImagen: '50px',
    anchoImagen: '120px',
    informacionBotones: [
      {
        label: 'Dashboard',
        variant: 'contained',
        color: 'success',
        onClick: fn(),
      },
      {
        label: 'Usuarios',
        variant: 'outlined',
        color: 'warning',
        onClick: fn(),
      },
    ],
  },
};
