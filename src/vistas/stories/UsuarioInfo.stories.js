import InfoUsuario from '../componentes/moleculas/UsuarioInfo';

export default {
  title: 'Componentes/Moléculas/InfoUsuario',
  component: InfoUsuario,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    modoEdicion: {
      control: 'boolean',
    },
    cliente: {
      control: 'text',
    },
    rol: {
      control: 'text',
    },
  },
};

const mockOnChange = () => {
  console.log('Cambiando campo...');
};

const baseArgs = {
  cliente: 'Toyota',
  rol: 'Supervisor',
  datosContacto: {
    email: 'example@gmail.com',
    telefono: '+98 765 4321',
    direccion: 'Av. Ejemplo 12, West B 34',
  },
  datosAdicionales: {
    nacimiento: '25 de marzo de 2025',
    genero: 'Masculino',
  },
  onChange: mockOnChange,
  opcionesRol: [
    { value: 'Administrador', label: 'Administrador' },
    { value: 'Supervisor', label: 'Supervisor' },
    { value: 'Usuario', label: 'Usuario' },
  ],
};

export const Lectura = {
  args: {
    ...baseArgs,
    modoEdicion: false,
    estadoUsuario: {
        label: 'Activo',
        color: 'primary',
        shape: 'circular',
        backgroundColor: 'rgba(24, 50, 165, 1)',
      },
  },
};

export const Edicion = {
  args: {
    ...baseArgs,
    modoEdicion: true,
    estadoUsuario: {
        label: 'Activo',
        color: 'primary',
        shape: 'circular',
        backgroundColor: 'rgba(24, 50, 165, 1)',
      },
  },
};