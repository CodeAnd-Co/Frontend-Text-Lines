//RF[7] Consulta Lista de Roles - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF7]
import React from 'react';
import CustomDataGrid from '../../componentes/organismos/Tabla';
import ContenedorLista from '../../componentes/Organismos/ContenedorLista';
import { useConsultarRoles } from '../../../hooks/Roles/useConsultarRoles';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { useNavigate } from 'react-router-dom';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';
import ModalCrearRol from '../../componentes/organismos/ModalCrearRol';

const ListaRoles = () => {
  const { roles, cargando, error, recargar } = useConsultarRoles();
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

  const filas = roles.map((rol) => ({
    id: rol.idRol,
    nombre: rol.nombre,
    descripcion: rol.descripcion,
    estado: rol.estado,
    urlImagen: rol.urlImagen,
  }));

  return (
    <ContenedorLista
      titulo={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Typography variant='h4' sx={{ mb: 0 }}>
            Roles
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <ModalCrearRol onRolCreado={recargar} />
            <button
              onClick={redirigirAUsuarios}
              style={{
                padding: '10px 20px',
                backgroundColor: 'transparent',
                color: colores.primario[2],
                border: `1px solid ${colores.primario[2]}`,
                borderRadius: '5px',
                height: '40px',
                cursor: 'pointer',
              }}
            >
              ATRÁS
            </button>
          </Box>
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
