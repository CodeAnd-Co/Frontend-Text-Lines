
// RF[32] - Consulta Lista de Cuotas - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF32
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, useTheme, Button, Box } from '@mui/material';
import { tokens } from '../../../theme';
import { useConsultarCuotas } from '../../../hooks/Cuotas/useConsultarCuotas';
import { useAuth } from '../../../hooks/AuthProvider';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import Tabla from '../../componentes/organismos/Tabla';
import Chip from '../../componentes/atomos/Chip';
import ModalCrearCuotaSet from '../../componentes/organismos/ModalCrearCuotaSet';
import Alerta from '../../Componentes/moleculas/Alerta';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';

/**
 * Página para consultar y mostrar la lista de cuotas en una tabla.
 *
 * Muestra los resultados en un CustomDataGrid, incluyendo
 * nombre, periodo de renovación y estado de renovación de cada set de cuotas.
 *
 * @see [RF[32] Consulta lista de cuotas](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF32)
 */

const ListaCuotas = () => {
  const navegar = useNavigate();
  const { usuario } = useAuth();
  const { cuotas, cargando, error } = useConsultarCuotas();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

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
          backgroundColor={params.value ? colores.primario[2] : colores.texto[3]}
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
      componente: <ModalCrearCuotaSet />
    },
    {
      label: 'Ir Atrás',
      variant: 'outlined',
      size: 'large',
      onClick: () => navegar(RUTAS.SISTEMA_ADMINISTRATIVO.BASE),
    },
  ];

  if (!usuario?.clienteSeleccionado) {
    return null;
  }

  return (
    <ContenedorLista
      titulo="Lista de Sets de Cuotas"
      descripcion="Consulta y administra los sets de cuotas registrados para cada cliente."
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '10px',
          mb: '20px',
        }}
      >
        {botones.map((boton, index) => (
          <Box key={index}>
            {boton.componente ? (
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

      <Box width="100%">
        {error && (
          <Alerta
            tipo="error"
            mensaje={error}
            icono
            cerrable
            centradoInferior
          />
        )}
        <Tabla columns={columnas} rows={filas} loading={cargando} checkboxSelection />
      </Box>
    </ContenedorLista>
  );
};

export default ListaCuotas;
