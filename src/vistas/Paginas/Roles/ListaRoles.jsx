//RF[7] Consulta Lista de Roles - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF7]
import React from 'react';
import CustomDataGrid from '../../componentes/organismos/dataGrid';
import Texto from '../../Componentes/Atomos/Texto';
import { useConsultarRoles } from '../../../hooks/Roles/useConsultarRoles';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../theme';

const ListaRoles = () => {
  const { roles, cargando } = useConsultarRoles();
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);

  const columnas = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 0.5,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
    },
  ];

  const filas = roles.map((roles) => ({
    id: roles.idRol,
    nombre: roles.nombre,
    descripcion: roles.descripcion,
    estado: roles.estado,
    urlImagen: roles.urlImagen,
  }));

  return (
    <Box sx={{ pl: '40px', pr: '40px', pb: '90px' }}> 
      <Box sx={{ mt: '70px', textAlign: 'center' }}> 
        <Texto variant="h4">Roles</Texto>
      </Box>
  
      <Box sx={{ mt: '20px' }}>
        <Box
          sx={{
            '& .estado-row--cell': {
              color: colores.primario[4],
            },
          }}
        >
          <CustomDataGrid
            columns={columnas}
            rows={filas}
            loading={cargando}
            checkboxSelection
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ListaRoles;