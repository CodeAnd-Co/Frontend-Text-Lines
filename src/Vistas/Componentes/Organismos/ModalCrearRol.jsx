import { useState } from 'react';
import FormaCrearRol from '@Organismos/Formularios/FormaCrearRol';
import ModalFlotante from '@Organismos/ModalFlotante';
import { useCrearRol } from '@Hooks/Roles/useCrearRol';
import Alerta from '@Moleculas/Alerta';
import { validarDatosCrearRol } from '@Modelos/Roles/modeloCrearRol'; 

const ModalCrearRol = ({ abierto, onCerrar, onRolCreado }) => {
  const [nombreRol, setNombreRol] = useState('');
  const [descripcionRol, setDescripcionRol] = useState('');
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);
  const [erroresCampos, setErroresCampos] = useState({}); 

  const { crearRol, exito, error, mensaje, cargando, resetEstado } = useCrearRol();

  const handleConfirmar = async () => {
    const errores = validarDatosCrearRol({
      nombreRol,
      descripcionRol,
      permisosSeleccionados,
    });

    setErroresCampos({ ...errores });

    if (Object.keys(errores).length > 0) return;

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
    setErroresCampos({});
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
        erroresCampos={erroresCampos}
        setErroresCampos={setErroresCampos}
      />

      {(exito || error) && (
        <Alerta
          tipo={exito ? 'success' : 'error'}
          mensaje={mensaje}
          duracion={exito ? 4000 : 8000}
          cerrable
          sx={{ mt: 2, mb: 2 }}
        />
      )}
    </ModalFlotante>
  );
};

export default ModalCrearRol;
