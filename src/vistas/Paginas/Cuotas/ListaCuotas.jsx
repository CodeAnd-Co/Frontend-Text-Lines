import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthProvider';
import { useConsultarCuotas } from '../../../hooks/Cuotas/useConsultarCuotas';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import CustomDataGrid from '../../componentes/organismos/Tabla';
import Chip from '../../componentes/atomos/Chip';
import ModalCrearCuotaSet from '../../componentes/organismos/ModalCrearCuotaSet';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';

const ListaCuotas = () => {
  const navegar = useNavigate();
  const { usuario } = useAuth();
  const { cuotas, cargando, error } = useConsultarCuotas();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (!usuario?.clienteSeleccionado) {
      navegar(RUTAS.SISTEMA_ADMINISTRATIVO.BASE);
    }
  }, [usuario, navegar]);

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

  const botones = [
    {
      tipo: 'modal',
      componente: <ModalCrearCuotaSet />
    },
    {
      label: 'Ir Atrás',
      onClick: () => navegar(RUTAS.SISTEMA_ADMINISTRATIVO.BASE),
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Typography variant="h4">Cuotas</Typography>
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {botones.map((boton, index) => (
              <Box key={index}>
                {boton.tipo === 'modal' ? (
                  boton.componente
                ) : (
    <Button
      variant={boton.variant}
      onClick={boton.onClick}
      sx={{
        minWidth: 'auto', 
        height: '40px',
        padding: '6px 16px', 
        textTransform: 'none', 
        fontSize: '0.875rem', 
        borderRadius: '8px',
        color: boton.variant === 'outlined' ? '#1976d2' : '#fff',
        borderColor: '#1976d2',
        backgroundColor: boton.variant === 'outlined' ? 'transparent' : '#1976d2',
        '&:hover': {
          backgroundColor: boton.variant === 'outlined' ? 'hsla(210, 78.70%, 46.10%, 0.04)' : '#1565c0',
          borderColor: '#1565c0',
        },
      }}
    >
  {boton.label}
</Button>
                )}
              </Box>
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