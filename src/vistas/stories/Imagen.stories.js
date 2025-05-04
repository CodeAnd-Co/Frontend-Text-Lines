import { fn } from '@storybook/test';
import Imagen from '../componentes/Atomos/Imagen';

export default {
  title: 'Componentes/Átomos/Imagen',
  component: Imagen,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    fit: {
      control: 'select',
      options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
    },
    borderRadius: { control: 'text' },
    style: { control: 'object' },
    clickable: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  args: {
    src: 'https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png',
    alt: 'Imagen de ejemplo',
    width: 'auto',
    height: 'auto',
    fit: 'cover',
    borderRadius: '0px',
    clickable: false,
    onClick: fn(),
  },
};

export const Estática = {
  args: {
    src: 'https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png',
    alt: 'Imagen estática',
    clickable: false,
  },
};

export const Clickeable = {
  args: {
    src: 'https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png',
    alt: 'Imagen clickeable',
    clickable: true,
    onClick: fn(),
  },
};

export const ConTamañoPersonalizado = {
  args: {
    src: 'https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png',
    alt: 'Imagen con tamaño personalizado',
    width: '200px',
    height: '200px',
    fit: 'cover',
    borderRadius: '8px',
    clickable: false,
  },
};

export const Redondeada = {
  args: {
    src: 'https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png',
    alt: 'Imagen redondeada',
    width: 'auto',
    height: 'auto',
    fit: 'cover',
    borderRadius: '50%',
    clickable: false,
  },
};

export const ConEstiloPersonalizado = {
  args: {
    src: 'https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png',
    alt: 'Imagen con estilo personalizado',
    style: { border: '2px solid #000' },
    clickable: false,
  },
};
