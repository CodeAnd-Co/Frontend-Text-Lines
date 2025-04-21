import React, { useEffect, useState } from 'react';
import CustomDataGrid from '../../componentes/organismos/dataGrid';
import { obtenerRoles } from '../../../dominio/repositorios/roles.api';

/**
 * Componente funcional que muestra una tabla con la lista de roles disponibles.
 * Utiliza un DataGrid personalizado para mostrar ID, nombre y descripción del rol.
 * Se conecta con el backend a través del repositorio de roles.
 */
const ListaRoles = () => {
  // Estado local para manejar la carga y los datos de los roles
  const [cargando, setCargando] = useState(true);
  const [roles, setRoles] = useState([]);

  // Hook de efecto que se ejecuta una vez al montar el componente
  useEffect(() => {
    const cargarRoles = async () => {
      try {
        // Se obtiene la respuesta de la API pasando parámetros de paginación
        const respuesta = await obtenerRoles({ limit: 10, offset: 0 });

        // Se asegura que cada rol tenga un identificador único necesario para el DataGrid
        const rolesConId = respuesta.roles.map((rol) => ({
          ...rol,
          id: rol.idRol || rol.id,
        }));

        setRoles(rolesConId);
      } catch (error) {
        console.error('Error al cargar roles:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarRoles();
  }, []);

  // Definición de las columnas que se mostrarán en el DataGrid
  const columnas = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Rol', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 500 },
  ];

  // Renderizado del componente principal con título centrado y el DataGrid
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600 }}>Roles</h1>
      </div>
      <CustomDataGrid
        rows={roles}
        columns={columnas}
        loading={cargando}
        checkboxSelection={true}
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default ListaRoles;
