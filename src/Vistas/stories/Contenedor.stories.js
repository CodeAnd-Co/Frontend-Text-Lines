import Contenedor from '@SRC/Vistas/Componentes/Atomos/Contenedor';

export default {
  title: 'Componentes/Átomos/Contenedor',
  component: Contenedor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: { type: 'number', min: 0, max: 24 },
    },
    background: {
      control: 'color',
    },
    borderLeft: {
      control: 'text',
      description: 'Color para el borde izquierdo (opcional)',
    },
    sx: {
      control: 'object',
      description: 'Estilos adicionales en formato MUI sx.',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    elevation: 1,
    background: '#ffffff',
    borderLeft: '',
    sx: {},
    children: 'Este es un contenedor con estilo básico.',
  },
};

export const Elevado = {
  args: {
    elevation: 8,
    children: 'Contenedor con más sombra.',
  },
};

export const ConFondo = {
  args: {
    background: '#f0f4c3',
    children: 'Contenedor con color de fondo personalizado.',
  },
};

export const ConBordeIzquierdo = {
  args: {
    borderLeft: '#4caf50',
    children: 'Contenedor con borde izquierdo verde.',
  },
};

export const PersonalizadoConSX = {
  args: {
    sx: {
      borderRadius: '16px',
      border: '1px dashed #ccc',
    },
    children: 'Contenedor con estilos personalizados.',
  },
};
