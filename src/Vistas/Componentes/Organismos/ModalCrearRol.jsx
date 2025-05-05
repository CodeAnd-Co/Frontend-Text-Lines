import { useState } from 'react';
import Boton from '@Atomos/Boton';
import FormaCrearRol from '@Organismos/Formularios/FormaCrearRol';
import ModalFlotante from '@Organismos/ModalFlotante';
import { useCrearRol } from '@Hooks/Roles/useCrearRol';
import Alerta from '@Moleculas/Alerta';

const ModalCrearRol = ({ onRolCreado }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreRol, setNombreRol] = useState('');
  const [descripcionRol, setDescripcionRol] = useState('');
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const { crearRol, exito, error, mensaje, cargando, resetEstado } = useCrearRol();

  const handleAbrir = () => {
    resetEstado();
    setMostrarFormulario(true);
  };

  const handleCerrar = () => {
    setMostrarFormulario(false);
    setNombreRol('');
    setDescripcionRol('');
    setPermisosSeleccionados([]);
    setMostrarAlerta(false);
  };

  const handleConfirmar = async () => {
    if (!nombreRol.trim() || permisosSeleccionados.length === 0) {
      setMostrarAlerta(true);
      return;
    }

    await crearRol(nombreRol.trim(), descripcionRol.trim(), permisosSeleccionados, () => {
      if (onRolCreado) onRolCreado();
      handleCerrar();
    });
  };

  return (
    <>
      <Boton label='Crear Rol' variant='contained' onClick={handleAbrir} size='large' />
      <ModalFlotante
        open={mostrarFormulario}
        onClose={handleCerrar}
        onConfirm={handleConfirmar}
        titulo='Crear Nuevo Rol'
        cancelLabel='Cancelar'
        confirmLabel={cargando ? 'Creando...' : 'Crear'}
      >
        <FormaCrearRol
          nombreRol={nombreRol}
          setNombreRol={setNombreRol}
          descripcionRol={descripcionRol}
          setDescripcionRol={setDescripcionRol}
          permisosSeleccionados={permisosSeleccionados}
          setPermisosSeleccionados={setPermisosSeleccionados}
          mostrarAlerta={mostrarAlerta}
          setMostrarAlerta={setMostrarAlerta}
        />

        {(exito || error) && (
          <Alerta
            tipo={exito ? 'success' : 'error'}
            mensaje={mensaje}
            duracion={exito ? 4000 : 8000}
            cerrable
            sx={{ mt: 2 }}
          />
        )}
      </ModalFlotante>
    </>
  );
};

export default ModalCrearRol;
