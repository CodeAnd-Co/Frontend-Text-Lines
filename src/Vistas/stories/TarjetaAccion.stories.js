import TarjetaAccion from '../Componentes/moleculas/TarjetaAccion';

export default {
  title: 'Componentes/Moléculas/TarjetaAccion',
  component: TarjetaAccion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icono: {
      control: 'text',
      description: 'Nombre del ícono a mostrar',
    },
    texto: {
      control: 'text',
      description: 'Texto que se muestra debajo del ícono',
    },
    onClick: { action: 'click', description: 'Función que se llama al hacer clic' },
    hoverScale: {
      control: 'boolean',
      description: 'Aplica un pequeño "scale" en hover',
    },
    disabled: {
      control: 'boolean',
      description: 'Desactiva la tarjeta',
    },
    sx: {
      control: 'object',
      description: 'Estilos adicionales (sobrescribe)',
    },
    iconSize: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del ícono',
    },
    textoVariant: {
      control: { type: 'select' },
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'overline',
        'button',
        'inherit',
      ],
      description: 'Variante tipográfica del texto',
    },
    tabIndex: {
      control: 'number',
      description: 'Índice de tabulación para accesibilidad',
    },
  },
  args: {
    icono: 'Add',
    texto: 'Agregar elemento',
    hoverScale: true,
    disabled: false,
    iconSize: 'large',
    textoVariant: 'button',
    tabIndex: 0,
  },
};

export const Normal = {
  args: {
    icono: 'Add',
    texto: 'Agregar cliente',
  },
};

export const Imagen = {
  args: {
    icono: 'Image',
    texto: 'Agregar imagen',
  },
};

export const SinHoverScale = {
  args: {
    icono: 'Upload',
    texto: 'Subir archivo',
    hoverScale: false,
  },
};

export const Deshabilitado = {
  args: {
    icono: 'Block',
    texto: 'Acción no disponible',
    disabled: true,
  },
};

export const Personalizado = {
  args: {
    icono: 'Build',
    texto: 'Configurar',
    sx: {
      backgroundColor: 'secondary.light',
      color: 'secondary.main',
      borderColor: 'secondary.main',
    },
  },
};