import { useState } from 'react';
import Boton from '../atomos/Boton';
import FormaCrearRol from '../organismos/Formularios/FormaCrearRol';
import ModalFlotante from '../organismos/ModalFlotante';
import { useCrearRol } from '../../../hooks/Roles/useCrearRol';
import Alerta from '../moleculas/Alerta';

const ModalCrearRol = ({ onRolCreado }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreRol, setNombreRol] = useState('');
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
    setPermisosSeleccionados([]);
    setMostrarAlerta(false);
  };

  const handleConfirmar = async () => {
    if (!nombreRol.trim() || permisosSeleccionados.length === 0) {
      setMostrarAlerta(true);
      return;
    }

    await crearRol(nombreRol.trim(), permisosSeleccionados, () => {
      if (onRolCreado) onRolCreado(); // Notifica al padre que debe recargar
      handleCerrar(); // Cierra el modal
    });
  };

  return (
    <>
      <Boton label="Añadir Rol" variant="contained" onClick={handleAbrir} size="large" />
      <ModalFlotante
        open={mostrarFormulario}
        onClose={handleCerrar}
        onConfirm={handleConfirmar}
        titulo="Crear Nuevo Rol"
        cancelLabel="Cancelar"
        confirmLabel={cargando ? 'Creando...' : 'Crear'}
      >
        <FormaCrearRol
          nombreRol={nombreRol}
          setNombreRol={setNombreRol}
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
