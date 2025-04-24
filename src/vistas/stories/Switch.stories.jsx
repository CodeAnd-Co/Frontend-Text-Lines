import React, { useState } from 'react';
import CustomSwitch from '../componentes/atomos/Switch';

export default {
  title: 'Componentes/Átomos/Switch',
  component: CustomSwitch,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    required: { control: 'boolean' },
    labelPlacement: {
      control: 'select',
      options: ['end', 'start', 'top', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'success', 'warning', 'info'],
    },
  },
};

const Template = (args) => {
  const [checked, setChecked] = useState(false);
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}
    >
      <CustomSwitch
        {...args}
        checked={checked}
        onChange={(evento) => setChecked(evento.target.checked)}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Activar modo',
  required: false,
  labelPlacement: 'top',
  size: 'medium',
  color: 'primary',
};

export const Label = Template.bind({});
Label.args = {
  label: 'Aceptar términos',
  labelPlacement: 'top',
};

export const LabelRequerido = Template.bind({});
LabelRequerido.args = {
  label: 'Debes aceptar',
  required: true,
  labelPlacement: 'top',
};

export const LabelEnd = Template.bind({});
LabelEnd.args = {
  label: 'Ubicación derecha',
  labelPlacement: 'end',
};

export const LabelBottom = Template.bind({});
LabelBottom.args = {
  label: 'Ubicación abajo',
  labelPlacement: 'bottom',
};

export const TamanoSmall = Template.bind({});
TamanoSmall.args = {
  label: 'Switch pequeño',
  size: 'small',
  labelPlacement: 'top',
};

export const ColorSecundario = Template.bind({});
ColorSecundario.args = {
  label: 'Color secundario',
  color: 'secondary',
  labelPlacement: 'top',
};

export const ControlledOnChange = (args) => {
  const [checked, setChecked] = useState(true);
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}
    >
      <CustomSwitch
        {...args}
        checked={checked}
        onChange={(evento) => {
          console.log('Switch cambiado a:', evento.target.checked);
          setChecked(evento.target.checked);
        }}
      />
    </div>
  );
};
ControlledOnChange.args = {
  label: 'Activo',
  labelPlacement: 'top',
};
