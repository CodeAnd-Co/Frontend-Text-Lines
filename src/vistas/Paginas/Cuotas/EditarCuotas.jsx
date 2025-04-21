import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import ProductosConCuotas from '../../componentes/organismos/ProductosConCuotas';
import TarjetaRenovacion from '../../componentes/organismos/TarjetaRenovacion';
import Boton from '../../componentes/atomos/boton';
import cuotaSetModelo from '../../../dominio/modelos/cuotaSetModelo';

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
      <h1>Editar Cuotas</h1>
      <TarjetaRenovacion
        periodoRenovacion={periodoRenovacion}
        setPeriodoRenovacion={setPeriodoRenovacion}
        renovacionActiva={renovacionActiva}
        setRenovacionActiva={setRenovacionActiva}
      />
      <ProductosConCuotas productos={productos} manejarCambioCuota={manejarCambioCuota} />
      <Boton onClick={handleClick} label={'Enviar'} />
    </>
  );
};

export default EditarCuotas;
