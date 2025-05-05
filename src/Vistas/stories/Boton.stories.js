import { fn } from '@storybook/test';
import Boton from '../Componentes/Atomos/Boton';

export default {
  title: 'Componentes/Átomos/Boton',
  component: Boton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    outlineColor: { control: 'color' },
    variant: {
      control: { type: 'select' },
      options: ['contained', 'outlined', 'text'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'success', 'warning', 'info'],
    },
    fullWidth: { control: 'boolean' },
    selected: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
  },
};

export const Contained = {
  args: {
    label: 'Label',
    variant: 'contained',
    size: 'medium',
    color: 'primary',
    fullWidth: false,
    selected: false,
    backgroundColor: 'rgba(24, 50, 165, 1)',
  },
};

export const ContainedSelected = {
  args: {
    label: 'Label',
    variant: 'contained',
    size: 'medium',
    color: 'primary',
    fullWidth: false,
    selected: true,
    backgroundColor: 'rgba(24, 50, 165, 1)',
  },
};

export const Outlined = {
  args: {
    label: 'Label',
    variant: 'outlined',
    size: 'medium',
    color: 'primary',
    fullWidth: false,
    selected: false,
    outlineColor: 'rgba(24, 50, 165, 1)',
  },
};

export const OutlinedSelected = {
  args: {
    label: 'Label',
    variant: 'outlined',
    size: 'medium',
    color: 'primary',
    fullWidth: false,
    selected: true,
    outlineColor: 'rgba(24, 50, 165, 1)',
  },
};

export const Text = {
  args: {
    label: 'Label',
    variant: 'text',
    color: 'primary',
  },
};

export const FullWidth = {
  args: {
    label: 'Label',
    variant: 'contained',
    size: 'medium',
    color: 'primary',
    fullWidth: false,
    selected: false,
    backgroundColor: 'rgba(24, 50, 165, 1)',
    fullWidth: true,
  },
};

export const FullWidthSelected = {
  args: {
    label: 'Label',
    variant: 'contained',
    size: 'medium',
    color: 'primary',
    fullWidth: false,
    selected: true,
    backgroundColor: 'rgba(24, 50, 165, 1)',
    fullWidth: true,
  },
};
