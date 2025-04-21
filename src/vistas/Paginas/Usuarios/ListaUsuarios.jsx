import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';

const ListaUsuarios = () => {
  const navigate = useNavigate();

  const irARoles = () => {
    navigate(`${RUTAS.SISTEMA_ADMINISTRATIVO.BASE}${RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.BASE}${RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.CONSULTAR_ROLES}`);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={irARoles}
        style={{ marginBottom: '1rem' }}
      >
        Roles
      </Button>
    </>
  );
};

export default ListaUsuarios;
