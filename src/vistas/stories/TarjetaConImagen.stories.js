import { fn } from '@storybook/test';
import TarjetaConImagen from '../Componentes/Moleculas/TarjetaConImagen';

export default {
  title: 'Componentes/Moléculas/TarjetaConImagen',
  component: TarjetaConImagen,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    iconName: { control: 'text' },
    iconVariant: {
      control: 'select',
      options: ['filled', 'outlined', 'rounded', 'sharp', 'twoTone'],
    },
    iconSize: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    iconColor: { control: 'color' },
    iconClickable: { control: 'boolean' },
    imageHeight: { control: 'text' },
    imageWidth: { control: 'text' },
    background: { control: 'color' },
    elevation: { control: 'number' },
    borderRadius: { control: 'text' },
    onClickImagen: { action: 'clicked imagen' },
    onClickIcono: { action: 'clicked icono' },
  },
  args: {
    src: 'https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png',
    alt: 'Imagen de ejemplo',
    title: 'Título de ejemplo',
    description: 'Descripción de la tarjeta de ejemplo.',
    iconName: 'Home',
    iconVariant: 'filled',
    iconSize: 'medium',
    iconColor: 'primary',
    iconClickable: true,
    imageHeight: 'auto',
    imageWidth: '100%',
    background: 'white',
    elevation: 2,
    borderRadius: '8px',
    onClickImagen: fn(),
    onClickIcono: fn(),
  },
};

export const TarjetaEstatica = {
  args: {
    title: 'Título Estático',
    description: 'Descripción estática sin acción en los iconos o imagen.',
    iconName: 'Home',
    iconClickable: false,
    onClickImagen: undefined,
    onClickIcono: undefined,
  },
};

export const TarjetaConIconoClickeable = {
  args: {
    title: 'Título con Icono Clickeable',
    description: 'Descripción con un icono clickeable.',
    iconName: 'Edit',
    iconClickable: true,
    onClickImagen: fn(),
    onClickIcono: fn(),
  },
};

export const TarjetaConImagenPersonalizada = {
  args: {
    src: 'https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png',
    alt: 'Imagen personalizada',
    title: 'Tarjeta con Imagen Personalizada',
    description: 'Tarjeta con imagen personalizada y clickeable.',
    iconName: 'Delete',
    iconVariant: 'outlined',
    iconSize: 'small',
    iconColor: 'error',
    iconClickable: true,
    imageHeight: '200px',
    imageWidth: '100%',
    background: 'lightgray',
    elevation: 4,
    borderRadius: '12px',
    onClickImagen: fn(),
    onClickIcono: fn(),
  },
};

export const TarjetaConEstiloPersonalizado = {
  args: {
    title: 'Tarjeta con Estilo Personalizado',
    description: 'Descripción con estilo personalizado en la tarjeta.',
    iconName: 'Settings',
    iconVariant: 'rounded',
    iconSize: 'large',
    iconColor: 'secondary',
    iconClickable: true,
    imageHeight: '250px',
    imageWidth: '100%',
    background: '#f7f7f7',
    elevation: 3,
    borderRadius: '16px',
    onClickImagen: fn(),
    onClickIcono: fn(),
  },
};
