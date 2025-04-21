import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import ProductosConCuotas from '../../componentes/organismos/ProductosConCuotas';

const EditarCuotas = () => {
  const ubicacion = useLocation();
  const { nombreCuotaSet, descripcion, productos } = ubicacion.state;

  // Estado para manejar las cuotas
  const [cuotas, setCuotas] = useState(
    productos.reduce((acc, producto) => {
      acc[producto.id] = 1; // Inicializa las cuotas
      return acc;
    }, {})
  );

  // Función para manejar el cambio de cuotas
  const manejarCambioCuota = (id, valor) => {
    setCuotas((prev) => ({
      ...prev,
      [id]: valor,
    }));
  };

  return (
    <>
      <h1>Editar Cuotas</h1>
      <ProductosConCuotas productos={productos} manejarCambioCuota={manejarCambioCuota} />
    </>
  );
};

export default EditarCuotas;
