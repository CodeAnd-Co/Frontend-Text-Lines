import CampoSelect from '@Atomos/CampoSelect';

export default {
  title: 'Componentes/Átomos/CampoSelect',
  component: CampoSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    fullWidth: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    helperText: { control: 'text' },
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    options: [
      { value: 'admin', label: 'Administrador' },
      { value: 'super', label: 'Super Admin' },
      { value: 'user', label: 'Usuario' },
    ],
    name: 'rol',
    label: 'Rol',
    value: 'admin',
    onChange: () => {},
  },
};

export const Basico = {
  args: {
    required: true,
  },
};

export const ConHelperText = {
  args: {
    helperText: 'Selecciona un rol para el usuario',
  },
};

export const ConError = {
  args: {
    error: true,
    helperText: 'Campo obligatorio',
  },
};

export const Deshabilitado = {
  args: {
    disabled: true,
  },
};

export const FullWidth = {
  args: {
    fullWidth: true,
  },
};
