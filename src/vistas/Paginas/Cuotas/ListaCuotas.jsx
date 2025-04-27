import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthProvider';
import { useConsultarCuotas } from '../../../hooks/Cuotas/useConsultarCuotas';
import { Box, Typography } from '@mui/material';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import CustomDataGrid from '../../componentes/organismos/Tabla';
import Chip from '../../componentes/atomos/Chip';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme'; 

const ListaCuotas = () => {
  const navegar = useNavigate();
  const { usuario } = useAuth();
  const { cuotas, cargando, error } = useConsultarCuotas();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 

  const columnas = [
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { 
      field: 'periodoRenovacion', 
      headerName: 'Periodo de Renovación (meses)', 
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'renovacionHabilitada',
      headerName: 'Renovación Habilitada',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Activo' : 'Inactivo'}
          shape="circular"
          size="medium"
          variant="filled"
          backgroundColor={params.value ? colors.primario[2] : colors.texto[3]}  
          textColor="#fff"  
        />
      ),
    },
  ];

  const filas = Array.isArray(cuotas)
  ? cuotas.map((cuota) => ({
      id: cuota.idCuotaSet,
      nombre: cuota.nombre,
      periodoRenovacion: cuota.periodoRenovacion,
      renovacionHabilitada: cuota.renovacionHabilitada === 1,
    }))
  : [];

  console.log('Cuotas:', cuotas);
  console.log('Filas:', filas);

  const botones = [
    {
      label: 'Añadir Cuota',
      onClick: () => console.log('Añadir Cuota clicked'),
      variant: 'contained',
      size: 'large',
    },
    {
      label: 'Ir Atrás',
      onClick: () => navegar('/admin'),
      variant: 'outlined',
      size: 'large',
    },
  ];

  if (!usuario?.clienteSeleccionado) {
    return null;
  }

  return (
    <ContenedorLista
      titulo={
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Typography variant="h4">Cuotas</Typography>
          <Box>
            {botones.map((boton, index) => (
              <button
                key={index}
                onClick={boton.onClick}
                style={{
                  padding: '10px 20px',
                  marginLeft: '10px',
                  backgroundColor: boton.variant === 'outlined' ? 'transparent' : '#1976d2',
                  color: boton.variant === 'outlined' ? '#1976d2' : '#fff',
                  border: boton.variant === 'outlined' ? '1px solid #1976d2' : 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                {boton.label}
              </button>
            ))}
          </Box>
        </Box>
      }
    >
      <Box sx={{ mt: '20px' }}>
        {error && (
          <Typography variant="h6" color="error" sx={{ textAlign: 'center', marginBottom: '20px' }}>
            Error: {error}
          </Typography>
        )}
        <CustomDataGrid columns={columnas} rows={filas} loading={cargando} checkboxSelection />
      </Box>
    </ContenedorLista>
  );
};

export default ListaCuotas;