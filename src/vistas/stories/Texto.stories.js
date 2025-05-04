import Texto from '../componentes/atomos/Texto';

export default {
  title: 'Componentes/Átomos/Texto',
  component: Texto,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
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
    color: {
      control: 'color',
    },
    align: {
      control: { type: 'select' },
      options: ['inherit', 'left', 'center', 'right', 'justify'],
    },
    gutterBottom: {
      control: 'boolean',
    },
    noWrap: {
      control: 'boolean',
    },
  },
  args: {
    children: 'Texto de ejemplo',
    gutterBottom: false,
    noWrap: false,
  },
};

export const H1 = {
  args: {
    variant: 'h1',
    gutterBottom: true,
  },
};

export const Body1 = {
  args: {
    variant: 'body1',
  },
};

export const Centered = {
  args: {
    variant: 'h4',
    align: 'center',
  },
};

export const CustomColor = {
  args: {
    variant: 'body2',
    color: '#2ecc71',
  },
};

export const NoWrapText = {
  args: {
    variant: 'body1',
    noWrap: true,
    children: 'Este es un texto sin salto de línea, que continuará en una sola línea.',
  },
};
