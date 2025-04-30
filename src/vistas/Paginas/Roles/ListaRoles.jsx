//RF[7] Consulta Lista de Roles - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF7]
import React from 'react';
import CustomDataGrid from '../../componentes/organismos/Tabla';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import { useConsultarRoles } from '../../../hooks/Roles/useConsultarRoles';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { useNavigate } from 'react-router-dom';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';

const ListaRoles = () => {
  const { roles, cargando, error } = useConsultarRoles(); // Include the error state
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);
  const navigate = useNavigate();

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

  const redirigirAUsuarios = () => {
    const path = `${RUTAS.SISTEMA_ADMINISTRATIVO.BASE}${RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.BASE}`;
    navigate(path, { replace: true });
  };

  const filas = roles.map((roles) => ({
    id: roles.idRol,
    nombre: roles.nombre,
    descripcion: roles.descripcion,
    estado: roles.estado,
    urlImagen: roles.urlImagen,
  }));

  const botones = [
    {
      label: 'ATRAS',
      onClick: () => redirigirAUsuarios(),
      variant: 'outlined',
      color: colores.primario[2],
      size: 'large',
    },
  ];

  return (
    <ContenedorLista
      titulo={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Box>
            {botones.map((boton, index) => (
              <button
                key={index}
                onClick={boton.onClick}
                style={{
                  padding: '10px 20px',
                  backgroundColor: boton.variant === 'outlined' ? 'transparent' : boton.color,
                  color: boton.variant === 'outlined' ? boton.color : '#fff',
                  border: boton.variant === 'outlined' ? `1px solid ${boton.color}` : 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                {boton.label}
              </button>
            ))}
          </Box>

          <Box sx={{ textAlign: 'center', flexGrow: 1 }}>Roles</Box>
        </Box>
      }
    >
      <Box sx={{ mt: '20px' }}>
        {error && (
          <Typography variant='h6' color='error' sx={{ textAlign: 'center', marginBottom: '20px' }}>
            Error: {error}
          </Typography>
        )}

        <CustomDataGrid columns={columnas} rows={filas} loading={cargando} checkboxSelection />
      </Box>
    </ContenedorLista>
  );
};

export default ListaRoles;
