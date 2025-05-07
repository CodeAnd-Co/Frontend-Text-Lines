import InfoCliente from '../componentes/moleculas/ClienteInfo';

export default {
  title: 'Componentes/Moléculas/InfoCliente',
  component: InfoCliente,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    idCliente: { control: 'text' },
    nombreLegal: { control: 'text' },
    nombreVisible: { control: 'text' },
    empleados: { control: 'number' },
    usuariosAsignados: { control: 'number' },
    imagenURL: { control: 'text' },
  },
};

const baseArgs = {
  cliente: 'TOYOTA',
  idCliente: '00001',
  nombreLegal: 'Toyota Motors Corporation',
  nombreVisible: 'Toyota',
  empleados: 1902,
  usuariosAsignados: 5,
  imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_logo.png',
};

export const InformacionCliente = {
    args: {
      ...baseArgs,
    },
  };