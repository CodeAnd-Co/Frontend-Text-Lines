import TarjetaRenovacion from '@Organismos/Cuotas/TarjetaRenovacion';
import ProductosConCuotas from '@Organismos/Cuotas/ProductosConCuotas';
import { Box, useTheme } from '@mui/material';
import GrupoBotones from '@Moleculas/GrupoBotones';
import PopUp from '@Moleculas/PopUp';
import { useNavigate } from 'react-router-dom';
import { tokens } from '@SRC/theme';
import { useState } from 'react';

const CuerpoPrincipal = ({
  periodoRenovacion,
  setPeriodoRenovacion,
  renovacionActiva,
  setRenovacionActiva,
  productos,
  cargando,
  enviarCuota,
  setCuotas,
  cuotas,
  abrirConfirmacion,
  setAbrirConfirmacion,
}) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const navegar = useNavigate();
  const [errorCuotas, setErrorCuotas] = useState('');

  const manejarCancelar = () => {
    setAbrirConfirmacion(true);
  };

  const confirmarSalida = () => {
    setAbrirConfirmacion(false);
    navegar('/admin/tablero/cuotas');
  };

  const cerrarPopup = () => {
    setAbrirConfirmacion(false);
  };

  const manejarCambioCuota = (id, valor) => {
    setCuotas((prev) => ({
      ...prev,
      [id.toString()]: valor,
    }));
  };

  // Nueva función para validar antes de enviar
  const manejarCrear = () => {
    const cuotasInvalidas = Object.values(cuotas).some((valor) => !/^[1-9]\d*$/.test(valor));
    if (cuotasInvalidas) {
      setErrorCuotas('Todas las cuotas deben ser números enteros mayores a 0');
      return;
    }
    setErrorCuotas('');
    enviarCuota();
  };

  const cuotasInvalidas = Object.values(cuotas).some((valor) => !/^[1-9]\d*$/.test(valor));

  const botonesEnviarCancelar = [
    {
      label: 'Cancelar',
      variant: 'contained',
      color: 'error',
      onClick: manejarCancelar,
      backgroundColor: colores.altertex[1],
    },
    {
      label: cargando ? 'Creando...' : 'Crear',
      variant: 'contained',
      onClick: manejarCrear,
      disabled: cargando || cuotasInvalidas, // <-- aquí
      color: 'error',
      backgroundColor: colores.altertex[1],
    },
  ];

  return (
    <>
      <TarjetaRenovacion
        periodoRenovacion={periodoRenovacion}
        setPeriodoRenovacion={setPeriodoRenovacion}
        renovacionActiva={renovacionActiva}
        setRenovacionActiva={setRenovacionActiva}
      />
      <Box
        sx={{
          maxHeight: '60vh',
          overflowY: 'auto',
          marginY: 2,
          borderRadius: 2,
          margin: 1,
        }}
      >
        <ProductosConCuotas
          productos={productos}
          cuotas={cuotas}
          manejarCambioCuota={manejarCambioCuota}
        />
      </Box>

      <Box sx={{ display: 'flex', width: '95%', justifyContent: 'flex-end', margin: 5 }}>
        <GrupoBotones buttons={botonesEnviarCancelar} />
      </Box>

      <PopUp
        abrir={abrirConfirmacion}
        cerrar={cerrarPopup}
        confirmar={confirmarSalida}
        dialogo={'¿Estás seguro de que deseas salir sin crear la cuota?'}
        labelConfirmar={'Confirmar'}
        labelCancelar={'Seguir Editando'}
      />
    </>
  );
};

export default CuerpoPrincipal;
