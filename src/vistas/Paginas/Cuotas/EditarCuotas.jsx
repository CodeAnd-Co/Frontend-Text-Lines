import { useLocation } from 'react-router-dom';

const EditarCuotas = () => {
  const ubicacion = useLocation();
  const { nombreCuotaSet, descripcion, productos } = ubicacion.state;

  console.log(nombreCuotaSet, descripcion, productos);
  return (
    <>
      <h1>Editar Cuotas</h1>
    </>
  );
};

export default EditarCuotas;
