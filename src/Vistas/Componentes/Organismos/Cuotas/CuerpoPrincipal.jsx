import TarjetaRenovacion from '@SRC/Vistas/Componentes/Organismos/Cuotas/TarjetaRenovacion';
import ProductosConCuotas from '@SRC/Vistas/Componentes/Organismos/Cuotas/ProductosConCuotas';
import { Box } from '@mui/material';
import GrupoBotones from '@SRC/Vistas/Componentes/Moleculas/GrupoBotones';
import PopUp from '@SRC/Vistas/Componentes/Moleculas/PopUp';
import { useNavigate } from 'react-router-dom';

const CuerpoPrincipal = ({
  periodoRenovacion,
  setPeriodoRenovacion,
  renovacionActiva,
  setRenovacionActiva,
  productos,
  cargando,
  enviarCuota,
  setCuotas,
  abrirConfirmacion,
  setAbrirConfirmacion,
}) => {
  const navegar = useNavigate();

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
  const botonesEnviarCancelar = [
    {
      label: 'Cancelar',
      onClick: manejarCancelar,
      variant: 'outlined',
      color: 'secondary',
      sx: { width: '120px', height: '52px' },
    },
    {
      label: cargando ? 'Enviando...' : 'Enviar',
      onClick: enviarCuota,
      disabled: cargando,
      variant: 'contained',
      color: 'primary',
      sx: { width: '120px', height: '52px' },
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
        <ProductosConCuotas productos={productos} manejarCambioCuota={manejarCambioCuota} />
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
