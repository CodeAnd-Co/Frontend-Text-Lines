import { useState, useEffect } from 'react';
import { useCrearGrupoEmpleados } from '@Hooks/Empleados/useCrearGrupoEmpleados';
import FormaCrearGrupoEmpleados from '@Organismos/Formularios/FormaCrearGrupoEmpleado';
import ModalFlotante from '@Organismos/ModalFlotante';
import Alerta from '@Moleculas/Alerta';

const ModalCrearGrupoEmpleado = ({ abierto = false, onCerrar, onCreado }) => {
  const [nombreGrupo, setNombreGrupo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [mensajeError, setMensajeError] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [intentoEnviar, setIntentoEnviar] = useState(false);

  const { handleGuardarGrupoEmpleados, errores, limpiarErrores } = useCrearGrupoEmpleados();

  useEffect(() => {
    if (!abierto) {
      setNombreGrupo('');
      setDescripcion('');
      setListaEmpleados([]);
      setMensajeError('');
      setMostrarAlerta(false);
      setIntentoEnviar(false);
      limpiarErrores();
    }
  }, [abierto]);

    useEffect(() => {
    if (mensajeError) {
      const tiempo = setTimeout(() => {
        setMensajeError('');
      }, 3000);
      return () => clearTimeout(tiempo);
    }
  }, [mensajeError]);

const handleConfirmar = async () => {
  setIntentoEnviar(true);

  const resultado = await handleGuardarGrupoEmpleados({
    nombreGrupo: nombreGrupo.trim(),
    descripcion: descripcion.trim(),
    listaEmpleados,
  });
  if (resultado.exito) {
    setMensajeError('');
    onCreado?.();
    onCerrar?.();
  } else {
    if (resultado.errores) {
      // errores de validación local
      setMensajeError('');
    } else {
      // error del backend
      setMensajeError(resultado.mensaje || 'Ocurrió un error al crear el grupo');
    }
  }
};
  const handleCerrar = () => onCerrar?.();

  return (
    <ModalFlotante
      open={abierto}
      onClose={handleCerrar}
      onConfirm={handleConfirmar}
      titulo='Crear Grupo de Empleados'
      confirmLabel='Crear'
      cancelLabel='Cancelar'
    >
      <FormaCrearGrupoEmpleados
        nombreGrupo={nombreGrupo}
        setNombreGrupo={setNombreGrupo}
        descripcion={descripcion}
        setDescripcion={setDescripcion}
        listaEmpleados={listaEmpleados}
        setListaEmpleados={setListaEmpleados}
        errores={errores} 
        intentoEnviar={intentoEnviar}
        mostrarAlerta={mostrarAlerta}
        setMostrarAlerta={setMostrarAlerta}
      />
      {mensajeError && (
        <Alerta
          tipo="error"
          mensaje={mensajeError}
          cerrable
          onClose={() => setMensajeError('')}
          sx={{ mt: 2 }}
        />
      )}
    </ModalFlotante>
  );
};

export default ModalCrearGrupoEmpleado;