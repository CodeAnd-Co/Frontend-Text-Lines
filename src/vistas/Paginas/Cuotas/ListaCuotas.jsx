import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthProvider';
import Texto from '../../componentes/atomos/Texto';
import ModalCrearCuotaSet from '../../componentes/organismos/ModalCrearCuotaSet';

const ListaCuotas = () => {
  const navegar = useNavigate();
  const { usuario, cargando } = useAuth();

  //si no hay un cliente seleccionado te manda a seleccionar cliente
  if (!usuario.clienteSeleccionado) {
    navegar(RUTAS.SISTEMA_ADMINISTRATIVO.BASE);
  }

  return (
    <>
      <Texto variant='h3'>Cuotas</Texto>
      <ModalCrearCuotaSet />
    </>
  );
};

export default ListaCuotas;
