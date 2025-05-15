// Importación de hooks de React y componentes del sistema de diseño.
import { useState, useEffect } from 'react';
import { useCrearGrupoEmpleados } from '@Hooks/Empleados/useCrearGrupoEmpleados';
import FormaCrearGrupoEmpleados from '@Organismos/Formularios/FormaCrearGrupoEmpleado';
import ModalFlotante from '@Organismos/ModalFlotante';
import Alerta from '@Moleculas/Alerta';

/**
 * Componente modal para crear un grupo de empleados.
 *
 * @component
 * @param {object} props - Props del componente.
 * @param {boolean} [props.abierto=false] - Indica si el modal está abierto.
 * @param {Function} props.onCerrar - Función que se ejecuta al cerrar el modal.
 * @param {Function} props.onCreado - Función que se ejecuta cuando se crea exitosamente un grupo.
 * @returns {JSX.Element} Modal con formulario y validación.
 */
const ModalCrearGrupoEmpleado = ({ abierto = false, onCerrar, onCreado }) => {
  // Estados del formulario
  const [nombreGrupo, setNombreGrupo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [listaEmpleados, setListaEmpleados] = useState([]);

  // Manejo de errores y alertas
  const [mensajeError, setMensajeError] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [intentoEnviar, setIntentoEnviar] = useState(false);

  // Hook personalizado para guardar el grupo
  const {
    handleGuardarGrupoEmpleados,
    errores,
    limpiarErrores,
  } = useCrearGrupoEmpleados();

  // Efecto: cuando se cierra el modal, se limpian los campos y errores
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
  }, [abierto]); // ✅ gracias a useCallback, no incluimos limpiarErrores

  // Efecto: muestra mensaje de error por 3 segundos
  useEffect(() => {
    if (mensajeError) {
      const tiempo = setTimeout(() => {
        setMensajeError('');
      }, 3000);
      return () => clearTimeout(tiempo);
    }
  }, [mensajeError]);

  /**
   * Maneja la acción de confirmar el formulario.
   * Valida los datos y llama al hook para guardar el grupo.
   */
  const handleConfirmar = async () => {
    setIntentoEnviar(true);

    const resultado = await handleGuardarGrupoEmpleados({
      nombreGrupo: nombreGrupo.trim(),
      descripcion: descripcion.trim(),
      listaEmpleados,
    });

    if (resultado.exito) {
      setMensajeError('');
      onCreado?.(); // Callback al crear exitosamente
      onCerrar?.(); // Cierre del modal
    } else {
      if (resultado.errores) {
        // Errores de validación controlada
        setMensajeError('');
      } else {
        // Error inesperado del backend
        setMensajeError(resultado.mensaje || 'Ocurrió un error al crear el grupo');
      }
    }
  };

  /**
   * Maneja el cierre del modal.
   */
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
          sx={{ mt: 2, mb: 2 }}
        />
      )}
    </ModalFlotante>
  );
};

export default ModalCrearGrupoEmpleado;