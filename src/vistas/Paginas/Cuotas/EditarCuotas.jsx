import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import ProductosConCuotas from '../../componentes/organismos/ProductosConCuotas';
import TarjetaRenovacion from '../../componentes/organismos/TarjetaRenovacion';
import Boton from '../../componentes/atomos/boton';
import cuotaSetModelo from '../../../dominio/modelos/cuotaSetModelo';
import { Box } from '@mui/material';
import Texto from '../../componentes/atomos/Texto';

const EditarCuotas = () => {
  const ubicacion = useLocation();
  const { nombreCuotaSet, descripcion, productos } = ubicacion.state;
  const [periodoRenovacion, setPeriodoRenovacion] = useState(6);
  const [renovacionActiva, setRenovacionActiva] = useState(true);

  const [cuotas, setCuotas] = useState(
    productos.reduce((acc, producto) => {
      acc[producto.id.toString()] = 1;
      return acc;
    }, {})
  );

  const manejarCambioCuota = (id, valor) => {
    setCuotas((prev) => ({
      ...prev,
      [id.toString()]: valor,
    }));
  };

  const handleClick = () => {
    const modelo = new cuotaSetModelo({
      idCliente: 102, //TODO: id del cliente esta hardcodeado
      nombreCuotaSet,
      descripcion,
      periodoRenovacion,
      renovacionHabilitada: renovacionActiva,
      productos,
      limites: cuotas,
    });
    console.log(modelo);
  };

  return (
    <>
      <Texto variant='h4' sx={{ margin: 5 }}>
        {nombreCuotaSet}
      </Texto>

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
      <Boton onClick={handleClick} label={'Enviar'} />
    </>
  );
};

export default EditarCuotas;
