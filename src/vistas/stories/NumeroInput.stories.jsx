import React, { useState } from 'react';
import { NumeroInput } from '../componentes/atomos/NumeroInput';

export default {
  title: 'Componentes/Átomos/NumeroInput',
  component: NumeroInput,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'number' },
    backgroundColor: { control: 'color' },
    width: { control: 'text' },
    min: { control: 'number' }, // 👈 Aquí
  },
};

const Template = (args) => {
  const [value, setValue] = useState(args.value || 1);

  return (
    <NumeroInput {...args} value={value} onChange={(evento) => setValue(evento.target.value)} />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'CUOTA',
  value: 1,
  backgroundColor: '#fff',
  width: '100px',
  min: 0,
};
