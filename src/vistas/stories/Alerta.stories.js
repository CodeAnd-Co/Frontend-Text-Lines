import React from 'react';
import Alerta from '../Componentes/Moleculas/Alerta';

export default {
  title: 'Componentes/Moléculas/Alerta',
  component: Alerta,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tipo: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
    },
    icono: { control: 'boolean' },
    iconoNombre: {
      control: 'text',
      description: 'Nombre personalizado del ícono (opcional)',
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
    },
    textoColor: {
      control: 'color',
    },
    mensaje: {
      control: 'text',
    },
  },
  args: {
    tipo: 'info',
    mensaje: 'Este es un mensaje de alerta informativa.',
    icono: true,
    textoVariant: 'body1',
  },
};

export const Informacion = {
  args: {
    tipo: 'info',
    mensaje: 'Esta es una alerta de tipo información.',
  },
};

export const Exito = {
  args: {
    tipo: 'success',
    mensaje: '¡Operación exitosa!',
  },
};

export const Advertencia = {
  args: {
    tipo: 'warning',
    mensaje: 'Cuidado, algo puede estar mal.',
  },
};

export const Error = {
  args: {
    tipo: 'error',
    mensaje: 'Ocurrió un error al procesar tu solicitud.',
  },
};

export const SinIcono = {
  args: {
    tipo: 'warning',
    mensaje: 'Esta alerta no tiene ícono.',
    icono: false,
  },
};

export const IconoPersonalizado = {
  args: {
    tipo: 'info',
    mensaje: 'Este usa un ícono personalizado.',
    iconoNombre: 'Lightbulb',
  },
};
