import { useState, useEffect } from 'react';
import { useCrearGrupoEmpleados } from '@Hooks/Empleados/useCrearGrupoEmpleados';
import FormaCrearGrupoEmpleados from '@Organismos/Formularios/FormaCrearGrupoEmpleado';
import ModalFlotante from '@Organismos/ModalFlotante';

const ModalCrearGrupoEmpleado = ({ abierto = false, onCerrar, onCreado }) => {
  const [nombreGrupo, setNombreGrupo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const { handleGuardarGrupoEmpleados } = useCrearGrupoEmpleados();

  // Limpiar los campos cuando se cierra el modal
  useEffect(() => {
    if (!abierto) {
      setNombreGrupo('');
      setDescripcion('');
      setListaEmpleados([]);
      setMostrarAlerta(false);
    }
  }, [abierto]);

  const handleConfirmar = async () => {
    if (!nombreGrupo.trim() || !descripcion.trim() || listaEmpleados.length === 0) {
      setMostrarAlerta(true);
      return;
    }
  
    setMostrarAlerta(false);
  
    const resultado = await handleGuardarGrupoEmpleados({
      nombreGrupo: nombreGrupo.trim(),
      descripcion: descripcion.trim(),
      listaEmpleados,
    });
  
    console.log('Resultado creación grupo:', resultado); // 👈
  
    if (resultado.exito) {
      if (onCreado) onCreado(); 
      if (onCerrar) onCerrar(); 
    } else {
      setMostrarAlerta(true);
    }
  };

  const handleCerrar = () => {
    if (onCerrar) {
      onCerrar();
    }
  };

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
        mostrarAlerta={mostrarAlerta}
        setMostrarAlerta={setMostrarAlerta}
      />
    </ModalFlotante>
  );
};

export default ModalCrearGrupoEmpleado;