import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthProvider';
import { useEffect } from 'react';
import Texto from '../../componentes/atomos/Texto';
import ModalCrearCuotaSet from '../../componentes/organismos/ModalCrearCuotaSet';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';

const ListaCuotas = () => {
  const navegar = useNavigate();
  const { usuario } = useAuth();

  useEffect(() => {
    if (!usuario?.clienteSeleccionado) {
      navegar(RUTAS.SISTEMA_ADMINISTRATIVO.BASE);
    }
  }, [usuario, navegar]);

  if (!usuario?.clienteSeleccionado) {
    return null;
  }

  return (
    <>
      <Texto variant='h4' sx={{ margin: 7 }}>
        Cuotas
      </Texto>
      <ModalCrearCuotaSet />
    </>
  );
};

export default ListaCuotas;
