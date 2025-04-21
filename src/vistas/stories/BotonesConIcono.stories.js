import { fn } from '@storybook/test';
import BotonesConIcono from '../componentes/moleculas/BotonesConIcono';

export default {
  title: 'Componentes/Moléculas/BotonesConIcono',
  component: BotonesConIcono,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Controles para el ícono
    iconoProps: {
      control: 'object',
    },
    // Controles para el grupo de botones
    botonesProps: {
      control: 'object',
    },
  },
};

export const NavegacionPrincipal = {
  args: {
    iconoProps: {
      nombre: 'Home',
      variant: 'filled',
      color: 'action',
      size: 'large',
      tooltip: 'Inicio',
      clickable: true,
      onClick: fn(),
    },
    botonesProps: {
      spacing: 2,
      direction: 'row',
      align: 'center',
      buttons: [
        {
          label: 'USUARIOS',
          variant: 'outlined',
          color: 'primary',
          size: 'medium',
          onClick: fn(),
          outlineColor: 'rgba(24, 50, 165, 1)',
        },
        {
          label: 'CONFIGURACIÓN',
          variant: 'outlined',
          color: 'primary',
          size: 'medium',
          onClick: fn(),
          outlineColor: 'rgba(24, 50, 165, 1)',
        },
        {
          label: 'CERRAR SESIÓN',
          variant: 'contained',
          color: 'primary',
          size: 'medium',
          onClick: fn(),
          backgroundColor: 'rgba(24, 50, 165, 1)',
        },
      ],
    },
  },
};
