import { useState, useEffect } from 'react';
import { useCrearGrupoEmpleados } from '@Hooks/Empleados/useCrearGrupoEmpleados';
import FormaCrearGrupoEmpleados from '@Organismos/Formularios/FormaCrearGrupoEmpleado';
import ModalFlotante from '@Organismos/ModalFlotante';

const ModalCrearGrupoEmpleado = ({ abierto = false, onCerrar, onCreado, onMostrarAlerta }) => {
  const [nombreGrupo, setNombreGrupo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [intentoEnviar, setIntentoEnviar] = useState(false);

  const {
    handleGuardarGrupoEmpleados,
    errores,
    limpiarErrores,
  } = useCrearGrupoEmpleados();

  useEffect(() => {
    if (!abierto) {
      setNombreGrupo('');
      setDescripcion('');
      setListaEmpleados([]);
      setIntentoEnviar(false);
      limpiarErrores();
    }
  }, [abierto, limpiarErrores]);

  const handleConfirmar = async () => {
    setIntentoEnviar(true);

    const resultado = await handleGuardarGrupoEmpleados({
      nombreGrupo: nombreGrupo.trim(),
      descripcion: descripcion.trim(),
      listaEmpleados,
    });

    if (resultado.exito) {
      onCreado?.();
      onCerrar?.();
    } else {
      if (!resultado.errores) {
        onMostrarAlerta?.({
          tipo: 'error',
          mensaje: resultado.mensaje || 'Ocurrió un error al crear el grupo',
          icono: true,
          cerrable: true,
          centradoInferior: true,
        });
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
        onMostrarAlerta={onMostrarAlerta}
      />
    </ModalFlotante>
  );
};

export default ModalCrearGrupoEmpleado