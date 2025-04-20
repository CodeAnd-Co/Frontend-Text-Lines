import { useState } from 'react';
import Boton from '../../componentes/atomos/Boton';
import FormaCrearCuotaSet from '../../componentes/organismos/FormaCrearCuotaSet';
import ModalFlotante from '../../componentes/organismos/ModalFlotante';

const ListaCuotas = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreCuotaSet, setNombreCuotaSet] = useState('');
  const [descripcionCuotaSet, setDescripcionCuotaSet] = useState('');

  const handleAbrir = () => setMostrarFormulario(true);
  const handleCerrar = () => setMostrarFormulario(false);

  const handleConfirmar = () => {
    console.log(nombreCuotaSet, descripcionCuotaSet);
    //TODO: agregar buscador y lista de productos
    //TODO: agregar modelo para poder enviar al backend
    //TODO: agregar logica para enviar datos al backend
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
        />
      </ModalFlotante>
    </>
  );
};

export default ListaCuotas;
