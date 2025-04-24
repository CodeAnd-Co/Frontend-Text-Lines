import React, { useState } from 'react';
import CustomDataGrid from '../../../Vistas/Componentes/Organismos/dataGrid';
import { useConsultarRoles } from "../../../hooks/Roles/useConsultarRoles";
import { Snackbar, Alert } from "@mui/material";


/**
 * Componente para visualizar la lista de roles disponibles
 * utilizando el hook personalizado y el DataGrid.
 */

const ListaRoles = () => {
  // Hook para obtener los roles desde el backend
  const { roles, cargando, error } = useConsultarRoles();

  const [busqueda, setBusqueda] = useState('');

  const rolesFiltrados = roles.filter((rol) =>
    rol.nombre.toLowerCase().includes(busqueda.toLowerCase())
    || rol.descripcion.toLowerCase().includes(busqueda.toLowerCase()));

  // Columnas que se mostrarán en el DataGrid
  const columns = [
    {
      field: 'nombre',
      headerName: 'Rol',
      flex: 1,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      flex: 2,
    },
  ];

  // Adaptar los datos al formato de filas para el DataGrid
  const rows = rolesFiltrados.map((rol) => ({
    id: rol.id, // obligatorio para el funcionamiento del DataGrid
    nombre: rol.nombre,
    descripcion: rol.descripcion,
  }));

  return (
    <div
      style={{
        padding: '1rem',
        margin: '0 auto',
        maxWidth: '95%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ height: 400, width: '100%' }}>
  <Snackbar open={!!error} autoHideDuration={600} onClose={() => {}}>
    <Alert severity="error" sx={{ width: '100%' }}>
      {error}
    </Alert>
  </Snackbar>
  <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem' }}>ROLES</h1>
  <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-start' }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="busqueda" style={{ marginBottom: '0.25rem', fontSize: '0.9rem', color: '#666' }}>Buscar</label>
      <input
        id="busqueda"
        type="text"
        placeholder="nombre, rol, etc..."
        value={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
        style={{
          width: '250px',
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  </div>
  <CustomDataGrid
    columns={columns}
    rows={rows}
    loading={cargando}
    checkboxSelection
  />
      </div>
    </div>
  );
};

export default ListaRoles;
