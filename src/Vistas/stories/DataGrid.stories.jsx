import React from 'react';
import Tabla from '../componentes/organismos/Tabla';

export default {
  title: 'Organismos/Tabla',
  component: Tabla,
};

const Template = (args) => <Tabla {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'edad', headerName: 'Edad', width: 100 },
    { field: 'correo', headerName: 'Correo', width: 250 },
  ],
  rows: [
    { id: 1, nombre: 'John Doe', edad: 30, correo: 'john.doe@example.com' },
    { id: 2, nombre: 'Jane Smith', edad: 25, correo: 'jane.smith@example.com' },
    { id: 3, nombre: 'Alice Johnson', edad: 35, correo: 'alice.johnson@example.com' },
    { id: 4, nombre: 'Jack Scott', edad: 30, correo: 'jack.scot@example.com' },
    { id: 5, nombre: 'Jasmin Bern', edad: 25, correo: 'jasmin@example.com' },
    { id: 6, nombre: 'Alisson Bell', edad: 35, correo: 'alisson.bell.johnson@example.com' },
  ],
  loading: false,
  pageSize: 5,
  onRowClick: (params) => console.log('Row clicked:', params.row),
  checkboxSelection: true,
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  ...Default.args,
  loading: true,
  checkboxSelection: false,
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  columns: Default.args.columns,
  rows: [],
  loading: false,
  pageSize: 5,
  checkboxSelection: false,
};
