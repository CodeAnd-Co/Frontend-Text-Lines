import { useLocation } from 'react-router-dom';

//TODO: agregar tarjetas y otros elementos aqui
//TODO: agregar logica para enviar datos al backend

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
