import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../../componentes/atomos/Boton';
import FormaCrearCuotaSet from '../../componentes/organismos/FormaCrearCuotaSet';
import ModalFlotante from '../../componentes/organismos/ModalFlotante';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';

const ListaCuotas = () => {
  const navegar = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreCuotaSet, setNombreCuotaSet] = useState('');
  const [descripcionCuotaSet, setDescripcionCuotaSet] = useState('');
  const [productos, setProductos] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const handleAbrir = () => setMostrarFormulario(true);
  const handleCerrar = () => setMostrarFormulario(false);

  const handleConfirmar = () => {
    if (!nombreCuotaSet || !descripcionCuotaSet || productos.length === 0) {
      setMostrarAlerta(true);
      return;
    }

    navegar(`/admin${RUTAS.SISTEMA_ADMINISTRATIVO.CUOTAS.EDITAR_CUOTAS}`, {
      state: {
        nombreCuotaSet,
        descripcion: descripcionCuotaSet,
        productos,
      },
    });
  };

  return (
    <>
      <h1>Cuotas</h1>

      <Boton label={'Añadir'} variant={'contained'} onClick={handleAbrir} />
      <ModalFlotante
        open={mostrarFormulario}
        onClose={handleCerrar}
        onConfirm={handleConfirmar}
        titulo='Agregar Set de Cuotas'
        cancelLabel='Cancelar'
        confirmLabel='Crear'
      >
        <FormaCrearCuotaSet
          nombreCuotaSet={nombreCuotaSet}
          setNombreCuotaSet={setNombreCuotaSet}
          descripcionCuotaSet={descripcionCuotaSet}
          setDescripcionCuotaSet={setDescripcionCuotaSet}
          productos={productos}
          setProductos={setProductos}
          mostrarAlerta={mostrarAlerta}
          setMostrarAlerta={setMostrarAlerta}
        />
      </ModalFlotante>
    </>
  );
};

export default ListaCuotas;
