import SetProductosInfo from '../componentes/moleculas/SetProductosInfo';

export default {
  title: 'Componentes/Moléculas/SetProductosInfo',
  component: SetProductosInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    nombre: { control: 'text' },
    descripcion: { control: 'text' },
    productos: { control: 'array' },
    grupos: { control: 'array' },
  },
};

const baseArgs = {
  nombre: 'Nombre del set de productos',
  descripcion: 'Uniforme que permite comodidad y movilidad...',
  productos: ['Botas', 'Chaleco', 'Playera'],
  grupos: ['Atención al Cliente', 'Recursos humanos'],
};

export const InformacionSetProductos = {
  args: {
    ...baseArgs,
  },
};
