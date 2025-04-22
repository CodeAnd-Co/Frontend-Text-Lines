import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProductosConCuotas from '../../componentes/organismos/ProductosConCuotas';
import TarjetaRenovacion from '../../componentes/organismos/TarjetaRenovacion';
import { Box } from '@mui/material';
import Texto from '../../componentes/atomos/Texto';
import Alerta from '../../componentes/moleculas/Alerta';
import { useCrearCuotaSet } from '../../../hooks/useCrearCuotaSet'; // Asegúrate de ajustar la ruta
import GrupoBotones from '../../componentes/moleculas/GrupoBotones';
import PopUpEliminar from '../../componentes/moleculas/popUpEliminar';

const EditarCuotas = () => {
  const ubicacion = useLocation();
  const navegar = useNavigate();
  const { nombreCuotaSet, descripcion, productos } = ubicacion.state;
  const [periodoRenovacion, setPeriodoRenovacion] = useState(6);
  const [renovacionActiva, setRenovacionActiva] = useState(true);
  const [cuotas, setCuotas] = useState(
    productos.reduce((acc, producto) => {
      acc[producto.id.toString()] = 1;
      return acc;
    }, {})
  );
  const [abrirConfirmacion, setAbrirConfirmacion] = useState(false);

  const { enviarCuota, exito, error, mensaje, cargando, setError } = useCrearCuotaSet({
    nombreCuotaSet,
    descripcion,
    periodoRenovacion,
    renovacionActiva,
    productos,
    cuotas,
    redirectPath: '/admin/cuotas', // Especificamos la ruta de redirección
    idCliente: 102, // Si necesitas personalizar el ID del cliente
  });

  const manejarCancelar = () => {
    setAbrirConfirmacion(true);
  };

  const confirmarSalida = () => {
    setAbrirConfirmacion(false);
    navegar('/admin/cuotas');
  };

  const cerrarPopup = () => {
    setAbrirConfirmacion(false);
  };

  const botonesEnviarCancelar = [
    {
      label: 'Cancelar',
      onClick: manejarCancelar, // o navigate(-1) si usas useNavigate
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

  const manejarCambioCuota = (id, valor) => {
    setCuotas((prev) => ({
      ...prev,
      [id.toString()]: valor,
    }));
  };

  return (
    <>
      <Texto variant='h4' sx={{ margin: 5 }}>
        {nombreCuotaSet}
      </Texto>

      {(exito || error) && (
        <Alerta
          tipo={exito ? 'success' : 'error'}
          mensaje={mensaje}
          duracion={exito ? 8000 : 10000}
          sx={{ margin: 3 }}
          cerrable
          onClose={error ? () => setError(false) : undefined}
        />
      )}

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

      <PopUpEliminar
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

export default EditarCuotas;
