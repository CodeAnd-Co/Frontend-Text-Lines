import { Button } from '@mui/material';
import ModalFlotante from '../../componentes/organismos/ModalFlotante';
import FormularioCrearUsuario from '../../componentes/organismos/FormularioCrearUsuario';
import { useCrearUsuario } from '../../../hooks/useCrearUsuario';
import Alerta from '../../componentes/moleculas/Alerta';
import { useState } from 'react';

const ListaUsuarios = () => {
  const {
    open,
    datosUsuario,
    errores,
    setDatosUsuario,
    handleOpen,
    handleClose,
    handleGuardarUsuario,
  } = useCrearUsuario();

  const [alerta, setAlerta] = useState(null);

  const handleConfirm = async () => {
    const resultado = await handleGuardarUsuario();

    if (resultado?.mensaje) {
      setAlerta({
        tipo: resultado.exito ? 'success' : 'error',
        mensaje: resultado.mensaje,
      });
    }
  };

  return (
    <div>
      <h1>Usuarios</h1>

      {alerta && (
        <Alerta
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          cerrable
          duracion={4000}
          centradoInferior
          onClose={() => setAlerta(null)}
        />
      )}

      <Button variant='contained' color='primary' onClick={handleOpen}>
        Añadir
      </Button>

      <ModalFlotante
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
        titulo='Crear nuevo usuario'
      >
        <FormularioCrearUsuario
          datosUsuario={datosUsuario}
          setDatosUsuario={setDatosUsuario}
          errores={errores}
        />
      </ModalFlotante>
    </div>
  );
};

export default ListaUsuarios;
