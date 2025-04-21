import { fn } from '@storybook/test';
import TarjetaBasica from '../componentes/moleculas/TarjetaBasica';

export default {
  title: 'Componentes/Moléculas/TarjetaBasica',
  component: TarjetaBasica,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tituloSecundario: { control: 'text' },
    tituloPrincipal: { control: 'text' },
    subtitulo: { control: 'text' },
    descripcion: { control: 'text' },
    textoBoton: { control: 'text' },
    alClicBoton: { action: 'clicked botón' },
    sx: { control: 'object' },
  },
  args: {
    tituloSecundario: 'Palabra del día',
    tituloPrincipal: 'benevolent',
    subtitulo: 'adjetivo',
    descripcion: 'well meaning and kindly. "a benevolent smile"',
    textoBoton: 'Aprender más',
    alClicBoton: fn(),
    sx: {
      minWidth: 275,
    },
  },
};

export const TarjetaDefault = {
  args: {
    tituloPrincipal: 'benevolent',
  },
};

export const TarjetaSinBoton = {
  args: {
    textoBoton: '',
    alClicBoton: undefined,
  },
};

export const TarjetaPersonalizada = {
  args: {
    tituloSecundario: 'Frase del día',
    tituloPrincipal: 'resilience',
    subtitulo: 'sustantivo',
    descripcion: 'the capacity to recover quickly from difficulties.',
    textoBoton: 'Ver más',
    sx: {
      backgroundColor: '#f5f5f5',
      borderRadius: '12px',
      padding: 2,
    },
  },
};
