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
    titulo: { control: 'text' },
    descripcion: { control: 'text' },
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
    alturaImagen: { control: 'text' },
    anchoImagen: { control: 'text' },
    ajusteImagen: {
      control: 'select',
      options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
    },
    fondo: { control: 'color' },
    elevacion: { control: 'number' },
    bordeRedondeado: { control: 'text' },
    alClicImagen: { action: 'clicked imagen' },
    alClicIcono: { action: 'clicked icono' },
  },
  args: {
    src: 'https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png',
    alt: 'Imagen de ejemplo',
    titulo: 'Título de ejemplo',
    descripcion: 'Descripción de la tarjeta de ejemplo.',
    nombreIcono: 'Home',
    varianteIcono: 'filled',
    tamanoIcono: 'medium',
    colorIcono: 'primary',
    iconoClickeable: true,
    alturaImagen: 'auto',
    anchoImagen: '100%',
    ajusteImagen: 'cover',
    fondo: 'white',
    elevacion: 2,
    bordeRedondeado: '8px',
    alClicImagen: fn(),
    alClicIcono: fn(),
  },
};

export const TarjetaEstatica = {
  args: {
    titulo: 'Título Estático',
    descripcion: 'Descripción estática sin acción en los iconos o imagen.',
    nombreIcono: 'Home',
    iconoClickeable: false,
    alClicImagen: undefined,
    alClicIcono: undefined,
  },
};

export const TarjetaConIconoClickeable = {
  args: {
    titulo: 'Título con Icono Clickeable',
    descripcion: 'Descripción con un icono clickeable.',
    nombreIcono: 'Edit',
    iconoClickeable: true,
    alClicImagen: fn(),
    alClicIcono: fn(),
  },
};

export const TarjetaConImagenPersonalizada = {
  args: {
    src: 'https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png',
    alt: 'Imagen personalizada',
    titulo: 'Tarjeta con Imagen Personalizada',
    descripcion: 'Tarjeta con imagen personalizada y clickeable.',
    nombreIcono: 'Delete',
    varianteIcono: 'outlined',
    tamanoIcono: 'small',
    colorIcono: 'error',
    iconoClickeable: true,
    alturaImagen: '200px',
    anchoImagen: '100%',
    fondo: 'lightgray',
    elevacion: 4,
    bordeRedondeado: '12px',
    alClicImagen: fn(),
    alClicIcono: fn(),
  },
};

export const TarjetaConEstiloPersonalizado = {
  args: {
    titulo: 'Tarjeta con Estilo Personalizado',
    descripcion: 'Descripción con estilo personalizado en la tarjeta.',
    nombreIcono: 'Settings',
    varianteIcono: 'rounded',
    tamanoIcono: 'large',
    colorIcono: 'secondary',
    iconoClickeable: true,
    alturaImagen: '250px',
    anchoImagen: '100%',
    fondo: '#f7f7f7',
    elevacion: 3,
    bordeRedondeado: '16px',
    alClicImagen: fn(),
    alClicIcono: fn(),
  },
};
