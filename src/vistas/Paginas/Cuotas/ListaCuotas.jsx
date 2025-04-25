import { useNavigate } from 'react-router-dom'; // Keep this import
import { useAuth } from '../../../hooks/AuthProvider';
import { useEffect } from 'react';
import Texto from '../../componentes/atomos/Texto';
import ModalCrearCuotaSet from '../../componentes/organismos/ModalCrearCuotaSet';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';
import React from 'react';
import CustomDataGrid from '../../componentes/organismos/Tabla';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import { useConsultarCuotas } from '../../../hooks/Cuotas/useConsultarCuotas';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';

const ListaCuotas = () => {
  const navegar = useNavigate();
  const { usuario } = useAuth();
  const { cuotas, cargando, error } = useConsultarCuotas(); // Include the error state
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
  const filas = cuotas.map((cuota) => ({
    id: cuota.idCuota,
    nombre: cuota.nombre,
    descripcion: cuota.descripcion,
    estado: cuota.estado,
    urlImagen: cuota.urlImagen,
  }));






  useEffect(() => {
    if (!usuario?.clienteSeleccionado) {
      navegar(RUTAS.SISTEMA_ADMINISTRATIVO.BASE);
    }
  }, [usuario, navegar]);

  if (!usuario?.clienteSeleccionado) {
    return null;
  }

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
          <Typography
            variant="h6"
            color="error"
            sx={{ textAlign: 'center', marginBottom: '20px' }}
          >
            Error: {error}
          </Typography>
        )}

        <CustomDataGrid
          columns={columnas}
          rows={filas}
          loading={cargando}
          checkboxSelection
        />
      </Box>
    </ContenedorLista>
  );
};

export default ListaCuotas;
