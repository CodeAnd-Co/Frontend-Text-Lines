import { useState } from 'react';
import FormaCrearRol from '@Organismos/Formularios/FormaCrearRol';
import ModalFlotante from '@Organismos/ModalFlotante';
import { useCrearRol } from '@Hooks/Roles/useCrearRol';
import Alerta from '@Moleculas/Alerta';

const ModalCrearRol = ({ abierto, onCerrar, onRolCreado }) => {
  const [nombreRol, setNombreRol] = useState('');
  const [descripcionRol, setDescripcionRol] = useState('');
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const { crearRol, exito, error, mensaje, cargando, resetEstado } = useCrearRol();

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

  const handleCerrar = () => {
    onCerrar();
    setNombreRol('');
    setDescripcionRol('');
    setPermisosSeleccionados([]);
    setMostrarAlerta(false);
    resetEstado();
  };

  return (
    <ModalFlotante
      open={abierto}
      onClose={handleCerrar}
      onConfirm={handleConfirmar}
      titulo="Crear Nuevo Rol"
      cancelLabel="Cancelar"
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
  );
};

export default ModalCrearRol;
