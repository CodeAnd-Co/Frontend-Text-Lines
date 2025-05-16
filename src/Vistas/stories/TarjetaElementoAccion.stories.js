import TarjetaElementoAccion from '../Componentes/Moleculas/TarjetaElementoAccion';

export default {
  title: 'Componentes/Moléculas/TarjetaElementoAccion',
  component: TarjetaElementoAccion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icono: {
      control: 'text',
      description: 'Nombre del ícono a mostrar en la tarjeta.',
    },
    texto: {
      control: 'text',
      description: 'Texto que se muestra al lado del ícono.',
    },
    onEliminar: {
      action: 'eliminar',
      description: 'Función que se llama al hacer clic en el botón de eliminar.',
    },
    tooltipEliminar: {
      control: 'text',
      description: 'Texto del tooltip que aparece al pasar el mouse sobre el ícono de eliminar.',
    },
    borderColor: {
      control: 'text',
      description: 'Color del borde de la tarjeta.',
    },
    backgroundColor: {
      control: 'text',
      description: 'Color de fondo de la tarjeta.',
    },
    iconColor: {
      control: 'text',
      description: 'Color del ícono principal.',
    },
    iconSize: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del ícono principal.',
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
      description: 'Variante tipográfica del texto.',
    },
    tabIndex: {
      control: 'number',
      description: 'Índice de tabulación para accesibilidad.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desactiva la tarjeta e inhabilita la acción de eliminar.',
    },
    sx: {
      control: 'object',
      description: 'Estilos adicionales para el contenedor principal.',
    },
  },
  args: {
    icono: 'Image',
    texto: 'archivo.png',
    tooltipEliminar: 'Eliminar',
    borderColor: 'primary.light',
    backgroundColor: 'primary.lighter',
    iconColor: 'primary',
    iconSize: 'large',
    textoVariant: 'caption',
    tabIndex: 0,
    disabled: false,
  },
};

export const Normal = {
  args: {
    icono: 'Image',
    texto: 'archivo.png',
  },
};

export const SinEliminar = {
  args: {
    icono: 'Folder',
    texto: 'Carpeta vacía',
    onEliminar: undefined,
  },
};

export const Deshabilitado = {
  args: {
    icono: 'Block',
    texto: 'Acción bloqueada',
    disabled: true,
  },
};

export const Personalizado = {
  args: {
    icono: 'Folder',
    texto: 'Proyecto Final',
    iconColor: 'warning.main',
    backgroundColor: 'warning.lighter',
    borderColor: 'warning.main',
    tooltipEliminar: 'Eliminar carpeta',
  },
};