import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';

const ListaUsuarios = () => {
  const navigate = useNavigate();

  const irARoles = () => {
    navigate(`/admin/usuarios${RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.CONSULTAR_ROLES}`);  };

  return (
    <Box sx={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Usuarios</h2>
      <Button variant="contained" color="primary" onClick={irARoles}>
        Roles
      </Button>
    </Box>
  );
};

export default ListaUsuarios;