// src/ui/pages/GrupoEmpleados/PaginaGrupoEmpleados.jsx

import React from 'react';
import CustomDataGrid from '../../Componentes/Organismos/dataGrid';
import { useConsultarGrupos } from '../../../hooks/Empleados/useConsultarGrupos';

const ListaGrupoEmpleados = () => {
  const { grupos, cargando, error } = useConsultarGrupos();

  const columns = [
    {
      field: 'nombre',
      headerName: 'Nombre del Grupo',
      flex: 2,
    },
    {
      field: 'idSetProducto',
      headerName: 'ID Set Producto',
      type: 'number',
      flex: 1,
    },
    {
      field: 'totalEmpleados',
      headerName: 'Total de Empleados',
      type: 'number',
      flex: 1,
    },
  ];

  // Las filas deben tener un campo `id`, usamos `idGrupo`
  const rows = grupos.map((grupo) => ({
    id: grupo.idGrupo,
    nombre: grupo.nombre,
    idSetProducto: grupo.idSetProducto,
    totalEmpleados: grupo.totalEmpleados,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <CustomDataGrid columns={columns} rows={rows} loading={cargando} checkboxSelection />
    </div>
  );
};

export default ListaGrupoEmpleados;
