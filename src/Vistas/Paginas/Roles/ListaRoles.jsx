// RF[7] Consulta Lista de Roles - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF7
import React, { useState } from 'react';
import CustomDataGrid from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import { useConsultarRoles } from '@Hooks/Roles/useConsultarRoles';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '@SRC/theme';
import { useNavigate } from 'react-router-dom';
import { RUTAS } from '@Constantes/rutas';
import ModalCrearRol from '@Organismos/ModalCrearRol';
import Alerta from '@Moleculas/Alerta';

const ListaRoles = () => {
  const { roles, cargando, error, recargar } = useConsultarRoles();
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);
  const navigate = useNavigate();

  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(''); 

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

  const handleAbrirModalCrear = () => {
    setModalCrearAbierto(true);
  };

  const handleCerrarModalCrear = () => {
    setModalCrearAbierto(false);
  };

  const handleRolCreado = () => {
    setMensajeExito('Rol creado exitosamente.');
    recargar(); 
    setTimeout(() => setMensajeExito(''), 4000);
  };

  const botones = [
    {
      label: 'Añadir',
      variant: 'contained',
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
      onClick: handleAbrirModalCrear,
    },
    {
      label: 'Atrás',
      onClick: redirigirAUsuarios,
      size: 'large',
      backgroundColor: 'transparent',
      color: colores.primario[2],
      border: `1px solid ${colores.primario[2]}`,
      borderRadius: '5px',
      height: '40px',
    },
  ];

  return (
    <>
      <ContenedorLista
        titulo="Lista de Roles"
        descripcion="Gestiona y organiza los roles registrados en el sistema."
        informacionBotones={botones}
      >
        <Box sx={{ mt: '20px' }}>
          {mensajeExito && (
            <Alerta
              tipo="success"
              mensaje={mensajeExito}
              duracion={4000}
              cerrable
              sx={{ mb: 2 }}
            />
          )}

          {error && (
            <Typography
              variant="h6"
              color="error"
              sx={{ textAlign: 'center', marginBottom: '20px' }}
            >
              Error: {error}
            </Typography>
          )}

          <CustomDataGrid columns={columnas} rows={filas} loading={cargando} checkboxSelection />
        </Box>
      </ContenedorLista>

      <ModalCrearRol
        abierto={modalCrearAbierto}
        onCerrar={handleCerrarModalCrear}
        onRolCreado={handleRolCreado} 
      />
    </>
  );
};

export default ListaRoles;
